const express = require('express');
const config = require('config');
const fetch = require('node-fetch');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const SCRYFALL_API = config.get('ScryFallAPI');

const Deck = require('../../models/Deck');
const User = require('../../models/User');

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

	const { user, types, picture } = req.body;

	try {
		var newDeck = new Deck({
			name: req.params.deckName,
			types: types,
			user: user,
			picture: picture,
		});

		//FIND COLORS
		var colors = [];
		const currentTypes = newDeck.types;
		for (var i = 0; i < currentTypes.length; ++i) {
			for (var j = 0; j < currentTypes[i].cards.length; ++j) {
				const currentCard = currentTypes[i].cards[j];
				if (!newDeck.picture) {
					newDeck.picture = currentCard.cardArt;
				}
				for (var k = 0; k < currentCard.colors.length; ++k) {
					const newColor = currentCard.colors[k];
					if (newColor && !colors.includes(newColor)) {
						colors.unshift(newColor);
						newDeck.colors.push({ color: newColor });
					}
				}
			}
		}
		//END COLOR FINDING

		await newDeck.save();

		var thisUser = await User.findById(user).select('-password');
		thisUser.decks.unshift(newDeck.id);
		await thisUser.save();

		res.json(newDeck);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.put('/types/typeChange/:deckId', async (req, res) => {
	try {
		const deck = await Deck.findOne({ _id: req.params.deckId });
		const { id, kind, shape } = await req.body;

		var index = -1;
		for (var i = 0; i < deck.types.length; ++i) {
			if (deck.types[i].id === id) {
				index = i;
				break;
			}
		}

		if (index !== -1) {
			switch (kind) {
				case 'open':
					deck.types[index].open = shape;
					await deck.save();
					res.json(deck);
					return;
			}
		}
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.put('/types/:deckId/:cardName', async (req, res) => {
	try {
		const cardName = req.params.cardName;
		const { card } = await req.body;

		//Find Correct Deck
		const deck = await Deck.findOne({ _id: req.params.deckId });
		if (!deck) {
			return res.json('Deck does not exist');
		}

		if (!deck.picture && card) {
			deck.picture = card.cardArt;
		}

		//If Card Exists, Increment It
		var exists = false;
		for (var i = 0; i < deck.types.length; ++i) {
			for (var j = 0; j < deck.types[i].cards.length; ++j) {
				const name = deck.types[i].cards[j].name.toString();
				if (name === cardName.toString()) {
					exists = true;

					deck.types[i].cards[j].quantity++;

					await deck.save();
					return res.json(deck);
				}
			}
		}

		if (!exists && card) {
			var existingType;
			for (var i = 0; i < deck.types.length; ++i) {
				if (card.types.includes(deck.types[i].name)) {
					deck.types[i].cards.unshift(card);
					existingType = true;
					break;
				}
			}
			if (!existingType) {
				deck.types.unshift({
					name: card.types[card.types.length - 1],
					open: true,
					cards: card,
				});
			}

			//FIND COLORS
			deck.colors = [];

			const types = deck.types;
			for (var i = 0; i < types.length; ++i) {
				for (var j = 0; j < types[i].cards.length; ++j) {
					const card = types[i].cards[j];
					for (var k = 0; k < card.colors.length; ++k) {
						const newColor = card.colors[k];
						if (deck.colors.length > 0) {
							var exists = false;
							for (var l = 0; l < deck.colors.length; ++l) {
								if (deck.colors[l].color === newColor) {
									exists = true;
									break;
								}
							}
							if (!exists) {
								deck.colors.push({ color: newColor });
							}
						} else {
							deck.colors.push({ color: newColor });
						}
					}
				}
			}
			//END COLOR FINDING

			await deck.save();
			return res.json(card);
		}

		await deck.save();
		return res.json(card);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/types/:deckId/:cardName', async (req, res) => {
	try {
		const cardName = req.params.cardName;

		const deck = await Deck.findOne({ _id: req.params.deckId });
		if (!deck) {
			return res.json('Deck does not exist');
		}

		//If Card Exists, Decrement It

		for (var i = 0; i < deck.types.length; ++i) {
			for (var j = 0; j < deck.types[i].cards.length; ++j) {
				if (deck.types[i].cards[j].name.toString() === cardName) {
					if (deck.types[i].cards[j].quantity > 1) {
						deck.types[i].cards[j].quantity--;

						await deck.save();
						return res.json(deck);
					} else {
						deck.types[i].cards.splice(j, 1);

						//FIND COLORS
						deck.colors = [];

						const types = deck.types;
						for (var i = 0; i < types.length; ++i) {
							for (var j = 0; j < types[i].cards.length; ++j) {
								const card = types[i].cards[j];
								for (var k = 0; k < card.colors.length; ++k) {
									const newColor = card.colors[k];
									if (deck.colors.length > 0) {
										var exists = false;
										for (var l = 0; l < deck.colors.length; ++l) {
											if (deck.colors[l].color === newColor) {
												exists = true;
												break;
											}
										}
										if (!exists) {
											deck.colors.push({ color: newColor });
										}
									} else {
										deck.colors.push({ color: newColor });
									}
								}
							}
						}
						//END COLOR FINDING

						await deck.save();
						return res.json(deck);
					}
				}
			}
		}

		await deck.save();
		return res.json(deck);
	} catch (error) {
		res.status(500).send('Server Error');
	}
});

router.post('/image/:deckId', async (req, res) => {
	try {
		const deck = await Deck.findOne({ _id: req.params.deckId });

		const { imageURL } = req.body;

		deck.picture = imageURL;
		await deck.save();

		res.json(deck);
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
