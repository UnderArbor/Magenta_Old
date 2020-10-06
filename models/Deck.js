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
		},
	],
});

module.exports = Deck = mongoose.model('Deck', DeckSchema);
