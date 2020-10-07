const express = require('express');
const config = require('config');
const fetch = require('node-fetch');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const SCRYFALL_API = config.get('ScryFallAPI');

const Deck = require('../../models/Deck');
const User = require('../../models/User');
const { remove } = require('../../models/Deck');

router.get('/', async (req, res) => {
	try {
		const decks = await Deck.find();
		res.json(decks);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.get('/:deckId', async (req, res) => {
	try {
		const deck = await Deck.findOne({ _id: req.params.deckId });
		if (deck) {
			return res.json(deck);
		} else {
			return res.status(400).json({ msg: 'Deck does not exist' });
		}
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.put('/:deckId/:name', async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const deck = await Deck.findOne({ _id: req.params.deckId });
		deck.name = req.params.name;
		await deck.save();
		res.json(deck);
	} catch (error) {}
});

router.post('/:deckName', async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { user, cards } = req.body;
	try {
		var newDeck = new Deck({
			name: req.params.deckName,
			cards: cards,
			user: user,
		});

		await newDeck.save();

		var thisUser = await User.findById(user).select('-password');
		thisUser.decks.unshift(newDeck.id);

		await thisUser.save();

		res.json(newDeck);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.put('/cards/:deckId/:cardName', async (req, res) => {
	try {
		const cardName = req.params.cardName;

		//Find Correct Deck
		const deck = await Deck.findOne({ _id: req.params.deckId });
		if (!deck) {
			return res.json('Deck does not exist');
		}

		//If Card Exists, Increment It
		if (
			(await deck.cards.filter((card) => card.name.toString() === cardName)
				.length) > 0
		) {
			const incrementIndex = deck.cards
				.map((card) => card.name)
				.indexOf(cardName);

			deck.cards[incrementIndex].quantity++;

			await deck.save();
			return res.json(deck);
		} else {
			//Fetch Image URL & Create Card
			let imageURL = '';
			let cardImageURL = '';
			await fetch(`${SCRYFALL_API}/cards/named?exact=${cardName}`)
				.then((response) => response.json())
				.then((json) => {
					imageURL = json.image_uris.art_crop;
					cardImageURL = json.image_uris.normal;
				});

			//Create new card
			const card = {
				name: cardName,
				quantity: 1,
				cardArt: imageURL,
				cardImage: cardImageURL,
			};

			deck.cards.unshift(card);
			await deck.save();
			return res.json(card);
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/cards/:deckId/:cardName', async (req, res) => {
	try {
		const cardName = req.params.cardName;

		const deck = await Deck.findOne({ _id: req.params.deckId });
		if (!deck) {
			return res.json('Deck does not exist');
		}

		if (
			(await deck.cards.filter((card) => card.name.toString() === cardName)
				.length) > 0
		) {
			const decrementIndex = deck.cards
				.map((card) => card.name)
				.indexOf(cardName);
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

router.delete('/single/:deckId', async (req, res) => {
	try {
		const deck = await Deck.findOneAndDelete({ _id: req.params.deckId });

		const user = await User.findById(deck.user);

		const removeIndex = await user.decks
			.map((deck) => deck._id)
			.indexOf(req.params.deckId);

		await user.decks.splice(removeIndex, 1);

		await user.save();

		res.json({ msg: 'Deck deleted!' });
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.delete('/deleteAll', async (req, res) => {
	try {
		Deck.deleteMany({}, function (err) {
			if (err) {
				res.status(500).send({ error: 'Could not clear deck database...' });
			} else {
				res
					.status(200)
					.send({ message: 'All user info was deleted succesfully...' });
			}
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
