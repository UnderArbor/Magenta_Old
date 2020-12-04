const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
	},
	types: [
		{
			name: {
				type: String,
			},
			open: {
				type: Boolean,
			},
			length: {
				type: Number,
			},
			cards: [
				{
					name: {
						type: String,
					},
					quantity: {
						type: Number,
					},
					cardArt: {
						type: String,
					},
					cardImage: {
						type: String,
					},
					cmc: {
						type: Number,
					},
					manaCost: {
						type: String,
					},
					mainType: {
						type: String,
					},
					types: [
						{
							type: String,
						},
					],
					subtypes: [
						{
							type: String,
						},
					],
					colors: [
						{
							type: String,
						},
					],
				},
			],
		},
	],
	picture: {
		type: String,
	},
	colors: [
		{
			color: {
				type: String,
			},
		},
	],
});

module.exports = Deck = mongoose.model('Deck', DeckSchema);
