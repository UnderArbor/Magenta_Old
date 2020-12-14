import axios from 'axios';
import {
	LOAD_DECK,
	OPEN_DECK,
	NEW_DECK,
	SAVE_NAME,
	CLOSE_DECK,
	SAVE_DECK,
	DELETE_DECK,
	DECK_ERROR,
	ADD_CARD,
	REMOVE_CARD,
	INSERT_CARD,
	INCREMENT_CARD,
	DECREMENT_CARD,
	CARD_ERROR,
	HEIGHT_CHANGE,
	CHANGE_IMAGE,
	OPEN_TOOLS,
	CLOSE_TOOLS,
	CLOSE_TYPE,
	OPEN_TYPE,
	ADD_TYPE,
	REMOVE_TYPE,
	CHANGE_CARD_SET,
} from './types';

import { loadUser } from './auth';

export const openDeck = (deckId, types) => async (dispatch) => {
	try {
		closeDeck();
		dispatch({
			type: LOAD_DECK,
		});
		if (deckId !== -1 && deckId !== -2) {
			const res = await axios.get(`api/deck/${deckId}`);

			dispatch({
				type: OPEN_DECK,
				payload: res.data.types,
				deckId,
				deckName: res.data.name,
				deckImage: res.data.picture,
			});
		} else if (deckId === -1) {
			dispatch({ type: NEW_DECK });
		} else if (deckId === -2) {
			var deckImage =
				'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80';
			for (var i = 0; i < types.length; ++i) {
				console.log('.');
				if (types[i].cards.length > 0) {
					deckImage = types[i].cards[0].cardArt;
					break;
				}
			}
			dispatch({
				type: OPEN_DECK,
				payload: types,
				deckId: 'importdeck',
				deckName: 'import deck',
				deckImage,
			});
		}

		dispatch({
			type: OPEN_TOOLS,
		});
	} catch (error) {
		dispatch({
			type: DECK_ERROR,
		});
	}
};

export const importDeck = (cards, name) => async (dispatch) => {
	await dispatch(changeImage(cards[cards.length - 1].cardArt, null));
	await dispatch(saveDeck(cards, name));
};

export const closeDeck = () => async (dispatch) => {
	try {
		dispatch({ type: CLOSE_DECK });
		dispatch({ type: CLOSE_TOOLS });

		dispatch(loadUser());
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const saveDeck = (types, deckName) => async (dispatch, getState) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get('/api/auth');
		const user = res.data._id;

		const picture = getState().deck.deckImage;

		const body = JSON.stringify({ user, types, picture });
		const deck = await axios.post(`api/deck/${deckName}`, body, config);
		await dispatch({ type: SAVE_DECK, payload: deck.data._id });
		await dispatch(openDeck(deck.data._id, types));
		dispatch(loadUser());

		return deck.data_id;
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const deleteDeck = (deckId) => async (dispatch) => {
	try {
		await axios.delete(`api/deck/single/${deckId}`);
		dispatch({ type: DELETE_DECK, payload: deckId });
		dispatch({ type: CLOSE_TOOLS });
		dispatch(closeDeck());
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const saveName = (name) => async (dispatch) => {
	try {
		dispatch(loadUser());
		dispatch({ type: SAVE_NAME, payload: name });
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const toggleType = (typeName, status) => async (dispatch) => {
	try {
		if (status) {
			dispatch({ type: CLOSE_TYPE, payload: typeName });
		} else {
			dispatch({ type: OPEN_TYPE, payload: typeName });
		}
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const moveType = (prevIndex, newIndex) => async (dispatch, getState) => {
	try {
		const typeObject = getState().deck.types[prevIndex];
		const isAuthenticated = getState().auth.isAuthenticated;

		dispatch({ type: REMOVE_TYPE, payload: prevIndex });
		if (Number(prevIndex) < Number(newIndex)) {
			newIndex = Number(newIndex) - 1;
		}

		dispatch({ type: ADD_TYPE, payload: newIndex, typeObject });

		if (isAuthenticated) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const body = await JSON.stringify({
				id: typeObject.id,
				kind: 'move',
				shape: getState().deck.types,
			});
			await axios.put(
				`/api/deck/types/typeChange/${getState().deck.deckId}`,
				body,
				config
			);
		}
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const addCard = (card) => async (dispatch) => {
	try {
		dispatch({ type: ADD_CARD, payload: card, cardType: card.mainType });
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};

export const moveCard = (cardName, newIndex, newType) => async (
	dispatch,
	getState
) => {
	try {
		console.log('Beginning');
		var card = null;

		const types = getState().deck.types;

		for (var k = 0; k < types.length; ++k) {
			for (var l = 0; l < types[k].cards.length; ++l) {
				if (types[k].cards[l].name === cardName) {
					card = types[k].cards[l];
					if (types[k].name === newType && l < newIndex) {
						newIndex--;
					}
					break;
				}
			}
		}

		console.log('Intermission 1');

		dispatch({ type: REMOVE_CARD, payload: cardName });

		console.log('Intermission 2');

		for (var i = 0; i < types.length; ++i) {
			if (types[i].name === newType) {
				for (var j = 0; j < types[i].cards.length + 1; ++j) {
					if (j === Number(newIndex) && card !== null) {
						dispatch({ type: INSERT_CARD, payload: card, i, j });
						break;
					}
				}
			}
		}
		console.log('End');
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};

export const incrementCard = (name) => async (dispatch) => {
	try {
		dispatch({ type: INCREMENT_CARD, payload: name });
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};

export const decrementCard = (name) => async (dispatch) => {
	try {
		dispatch({ type: DECREMENT_CARD, payload: name });
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};

export const heightChange = (element) => async (dispatch) => {
	try {
		dispatch({ type: HEIGHT_CHANGE, payload: element.clientHeight });
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};

export const changeImage = (imageURL, deckId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const body = JSON.stringify({ imageURL });
		if (deckId) {
			await axios.post(`/api/deck/image/${deckId}`, body, config);
		}
		dispatch({ type: CHANGE_IMAGE, payload: imageURL });
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};

export const changeCardSet = (setInfo, name) => async (dispatch, getState) => {
	try {
		const types = await getState().deck.types;
		var index1 = null;
		var index2 = null;
		for (var i = 0; i < types.length; ++i) {
			for (var j = 0; j < types[i].cards.length; ++j) {
				if (types[i].cards[j].name === name) {
					index1 = i;
					index2 = j;
					break;
				}
			}
		}
		dispatch({
			type: CHANGE_CARD_SET,
			payload: setInfo,
			typeIndex: index1,
			cardIndex: index2,
		});
	} catch (error) {
		dispatch({ type: CARD_ERROR });
	}
};
