const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
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
			image: {
				type: String,
			},
		},
	],
});

module.exports = Deck = mongoose.model('deck', DeckSchema);
