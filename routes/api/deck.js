const express = require('express');
const config = require('config');
const fetch = require('node-fetch');
const router = express.Router();

const SCRYFALL_API = config.get('ScryFallAPI');

const Deck = require('../../models/Deck');

router.get('/', async (req, res) => {
	try {
		const decks = await Deck.find();
		res.json(decks);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.post('/:deckName', async (req, res) => {
	try {
		const newDeck = new Deck({ name: req.params.deckName });

		await newDeck.save();

		res.json(newDeck);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.get('/:deckName', async (req, res) => {
	try {
		const deck = await Deck.findOne({ name: req.params.deckName });
		if (deck) {
			return res.json(deck);
		} else {
			return res.status(400).json({ msg: 'Deck does not exist' });
		}
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.delete('/:deckName', async (req, res) => {
	try {
		await Deck.findOneAndDelete({ name: req.params.deckName });
		res.json({ msg: 'Deck deleted!' });
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.put('/cards/:deckName/:cardName', async (req, res) => {
	try {
		//Fetch Full Card Name
		let name = '';
		await fetch('https://api.scryfall.com/catalog/card-names')
			.then((response) => response.json())
			.then((json) => {
				var cardQuery = req.params.cardName.toUpperCase();
				for (var index = 0; index < json.total_values; ++index) {
					if (json.data[index].toUpperCase().startsWith(cardQuery)) {
						name = json.data[index];
						break;
					}
				}
			});

		//Find Correct Deck
		const deck = await Deck.findOne({ name: req.params.deckName });
		if (!deck) {
			return res.json('Deck does not exist');
		}

		//If Card Exists, Increment It
		if (
			(await deck.cards.filter((card) => card.name.toString() === name)
				.length) > 0
		) {
			const incrementIndex = deck.cards.map((card) => card.name).indexOf(name);

			if (deck.cards[incrementIndex].quantity < 4) {
				deck.cards[incrementIndex].quantity++;
			} else {
				return res.json('TOO MANY CARDS!!!');
			}

			await deck.save();
			return res.json(deck);
		} else {
			//Else, Fetch Image URL & Create Card
			let imageURL = '';
			await fetch(`${SCRYFALL_API}/cards/named?exact=${name}`)
				.then((response) => response.json())
				.then((json) => {
					imageURL = json.image_uris.art_crop;
				})
				.catch(
					(error) =>
						(imageURL =
							'https://i.pinimg.com/236x/19/f1/03/19f10331ba104183b0a3b43f5ec8822c--cards.jpg')
				);

			//Create new card
			const card = {
				name: name || 'Dude, you fucked up',
				quantity: 1,
				image: imageURL,
			};

			deck.cards.unshift(card);
			await deck.save();
			return res.json(deck);
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/cards/:deckName/:cardName', async (req, res) => {
	try {
		let name = '';
		await fetch('https://api.scryfall.com/catalog/card-names')
			.then((response) => response.json())
			.then((json) => {
				var cardQuery = req.params.cardName.toUpperCase();
				for (var index = 0; index < json.total_values; ++index) {
					if (json.data[index].toUpperCase().startsWith(cardQuery)) {
						name = json.data[index];
						break;
					}
				}
			});

		const deck = await Deck.findOne({ name: req.params.deckName });
		if (!deck) {
			return res.json('Deck does not exist');
		}

		if (
			(await deck.cards.filter((card) => card.name.toString() === name)
				.length) > 0
		) {
			const decrementIndex = deck.cards.map((card) => card.name).indexOf(name);
			if (deck.cards[decrementIndex].quantity > 1) {
				deck.cards[decrementIndex].quantity--;
			} else {
				deck.cards.splice(decrementIndex, 1);
			}
		} else {
			return res.json('WRONG CARD, IDIOT!!!');
		}

		await deck.save();
		return res.json(deck);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
