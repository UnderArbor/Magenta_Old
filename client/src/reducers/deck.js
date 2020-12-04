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
	HEIGHT_CHANGE,
	CHANGE_IMAGE,
	CARD_ERROR,
	LOGOUT,
	CLOSE_TYPE,
	OPEN_TYPE,
	ADD_TYPE,
	REMOVE_TYPE,
} from '../actions/types';

const initialState = {
	showDeck: false,
	loading: false,
	decks: [],
	types: [],
	deckId: '',
	deckName: '',
	openTools: false,
	deckImage:
		'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
	height: 1000,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	let index = 0;
	let index2 = 0;

	switch (type) {
		case LOGOUT:
			return {
				...state,
				showDeck: false,
				loading: false,
				decks: [],
				types: [],
				deckId: '',
				deckName: '',
			};
		case LOAD_DECK:
			return {
				...state,
				showDeck: true,
				loading: true,
				types: [],
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
				types: payload,
				deckId: action.deckId,
				deckName: action.deckName,
				deckImage:
					action.deckImage ||
					'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
			};
		case NEW_DECK:
			return {
				...state,
				loading: false,

				types: [
					{ name: 'Creature', open: true, cards: [] },
					{ name: 'Enchantment', open: true, cards: [] },
					{ name: 'Artifact', open: true, cards: [] },
					{ name: 'Planeswalker', open: true, cards: [] },
					{ name: 'Instant', open: true, cards: [] },
					{ name: 'Sorcery', open: true, cards: [] },
					{ name: 'Land', open: true, cards: [] },
					{ name: 'Hero', open: true, cards: [] },
					{ name: 'Vanguard', open: true, cards: [] },
					{ name: 'Conspiracy', open: true, cards: [] },
					{ name: 'Scheme', open: true, cards: [] },
					{ name: 'Plane', open: true, cards: [] },
					{ name: 'Phenomenon', open: true, cards: [] },
				],
				deckName: `untitled`,
			};
		case SAVE_NAME:
			return { ...state, deckName: payload };
		case CLOSE_DECK:
			return {
				...state,
				showDeck: false,
				types: [],
				deckId: '',
				deckName: '',
				deckImage:
					'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
				loading: false,
				height: 1000,
			};
		case SAVE_DECK:
			return { ...state, deckId: payload };
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
		case CLOSE_TYPE:
			index = state.types.map((type) => type.name).indexOf(payload);
			return {
				...state,
				types: [
					...state.types.slice(0, index),
					{
						...state.types[index],
						open: false,
					},
					...state.types.slice(index + 1),
				],
			};
		case OPEN_TYPE:
			index = state.types.map((type) => type.name).indexOf(payload);
			return {
				...state,
				types: [
					...state.types.slice(0, index),
					{
						...state.types[index],
						open: true,
					},
					...state.types.slice(index + 1),
				],
			};
		case ADD_TYPE:
			return {
				...state,
				types: [
					...state.types.slice(0, Number(payload)),
					action.typeObject,
					...state.types.slice(Number(payload)),
				],
			};
		case REMOVE_TYPE:
			return {
				...state,
				types: [
					...state.types.slice(0, Number(payload)),
					...state.types.slice(Number(payload) + 1),
				],
			};
		case ADD_CARD:
			var exists = false;
			for (index = 0; index < state.types.length; ++index) {
				if (action.cardType === state.types[index].name) {
					return {
						...state,
						types: [
							...state.types.slice(0, index),
							{
								...state.types[index],
								cards: [...state.types[index].cards, payload],
							},
							...state.types.slice(index + 1),
						],
					};
				}
			}
			if (!exists) {
				return {
					...state,
					types: [
						...state.types,
						{
							name: action.cardType,
							open: true,
							cards: [payload],
						},
					],
				};
			}
			break;

		case INCREMENT_CARD:
			for (index = 0; index < state.types.length; ++index) {
				for (index2 = 0; index2 < state.types[index].cards.length; ++index2) {
					if (payload === state.types[index].cards[index2].name) {
						return {
							...state,
							types: [
								...state.types.slice(0, index),
								{
									...state.types[index],
									cards: [
										...state.types[index].cards.slice(0, index2),
										{
											...state.types[index].cards[index2],
											quantity:
												Number(state.types[index].cards[index2].quantity) + 1,
										},
										...state.types[index].cards.slice(index2 + 1),
									],
								},
								...state.types.slice(index + 1),
							],
						};
					}
				}
			}
			break;
		case DECREMENT_CARD:
			for (index = 0; index < state.types.length; ++index) {
				for (index2 = 0; index2 < state.types[index].cards.length; ++index2) {
					if (payload === state.types[index].cards[index2].name) {
						if (state.types[index].cards[index2].quantity > 1) {
							return {
								...state,
								types: [
									...state.types.slice(0, index),
									{
										...state.types[index],
										cards: [
											...state.types[index].cards.slice(0, index2),
											{
												...state.types[index].cards[index2],
												quantity: state.types[index].cards[index2].quantity - 1,
											},
											...state.types[index].cards.slice(index2 + 1),
										],
									},
									...state.types.slice(index + 1),
								],
							};
						} else {
							return {
								...state,
								types: [
									...state.types.slice(0, index),
									{
										...state.types[index],
										cards: [
											...state.types[index].cards.slice(0, index2),
											...state.types[index].cards.slice(index2 + 1),
										],
									},
									...state.types.slice(index + 1),
								],
							};
						}
					}
				}
			}
			break;
		case HEIGHT_CHANGE:
			return { ...state, height: payload };
		case CHANGE_IMAGE:
			return { ...state, deckImage: payload };
		case CARD_ERROR:
		case DECK_ERROR:
		default:
			return state;
	}
}
