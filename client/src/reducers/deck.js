import {
	LOAD_DECK,
	LOAD_DECK_LIST,
	OPEN_DECK,
	NEW_DECK,
	SAVE_NAME,
	CLOSE_DECK,
	SAVE_DECK,
	DELETE_DECK,
	DECK_ERROR,
	ADD_CARD,
	INCREMENT_CARD,
	DECREMENT_CARD,
	CARD_ERROR,
} from '../actions/types';

const initialState = {
	showDeck: false,
	loading: false,
	decks: [],
	cards: [],
	deckId: '',
	deckName: '',
	saved: true,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	let index = 0;

	switch (type) {
		case LOAD_DECK:
			return {
				...state,
				showDeck: true,
				loading: true,
				cards: [],
				deckId: '',
				deckName: '',
			};
		case LOAD_DECK_LIST:
			return {
				...state,
				decks: payload,
			};
		case OPEN_DECK:
			return {
				...state,
				loading: false,
				cards: payload,
				saved: true,
				deckId: action.deckId,
				deckName: action.deckName,
			};
		case NEW_DECK:
			return {
				...state,
				loading: false,
				cards: [],
				saved: false,
				deckName: `untitled ${state.decks.length + 1}`,
			};
		case SAVE_NAME:
			return { ...state, deckName: payload };
		case CLOSE_DECK:
			return {
				...state,
				showDeck: false,
				saved: true,
				cards: [],
				deckId: '',
				deckName: '',
				loading: false,
			};
		case SAVE_DECK:
			return { ...state, saved: true, deckId: payload };
		case DELETE_DECK:
			if (state.decks.length > 0) {
				const index = state.decks.map((deck) => deck._id).indexOf(payload);
				return {
					...state,
					decks: [
						...state.decks.slice(0, index),
						...state.decks.slice(index + 1),
					],
				};
			} else {
				return { ...state };
			}
		case ADD_CARD:
			return { ...state, cards: [...state.cards, payload] };
		case INCREMENT_CARD:
			index = state.cards.map((card) => card.name).indexOf(payload);
			return {
				...state,
				cards: [
					...state.cards.slice(0, index),
					{
						...state.cards[index],
						quantity: state.cards[index].quantity + 1,
					},
					...state.cards.slice(index + 1),
				],
			};
		case DECREMENT_CARD:
			index = state.cards.map((card) => card.name).indexOf(payload);
			if (state.cards[index].quantity > 1) {
				return {
					...state,
					cards: [
						...state.cards.slice(0, index),
						{
							...state.cards[index],
							quantity: state.cards[index].quantity - 1,
						},
						...state.cards.slice(index + 1),
					],
				};
			} else {
				return {
					...state,
					cards: [
						...state.cards.slice(0, index),
						...state.cards.slice(index + 1),
					],
				};
			}
		case CARD_ERROR:
		case DECK_ERROR:
		default:
			return state;
	}
}
