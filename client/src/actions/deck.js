import axios from 'axios';
import {
	LOAD_DECK,
	OPEN_DECK,
	NEW_DECK,
	SAVE_NAME,
	CLOSE_DECK,
	SAVE_DECK,
	DECK_ERROR,
	ADD_CARD,
	INCREMENT_CARD,
	REMOVE_CARD,
	DECREMENT_CARD,
	CARD_ERROR,
} from './types';

import { loadUser } from './auth';

export const openDeck = (deckId) => async (dispatch) => {
	try {
		closeDeck();
		dispatch({
			type: LOAD_DECK,
		});

		if (deckId !== -1) {
			const res = await axios.get(`api/deck/${deckId}`);
			dispatch({
				type: OPEN_DECK,
				payload: res.data.cards,
				deckId,
				deckName: res.data.name,
			});
		} else {
			dispatch({ type: NEW_DECK, payload: null });
		}
	} catch (error) {
		dispatch({
			type: DECK_ERROR,
		});
	}
};

export const closeDeck = () => async (dispatch) => {
	try {
		dispatch({ type: CLOSE_DECK });

		dispatch(loadUser());
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const saveDeck = (cards, deckName) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.get('/api/auth');
		const user = res.data._id;

		const body = JSON.stringify({ user, cards });
		const deck = await axios.post(`api/deck/${deckName}`, body, config);
		dispatch({ type: SAVE_DECK, payload: deck.data._id });

		dispatch(loadUser());
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const saveName = (name) => async (dispatch) => {
	try {
		dispatch({ type: SAVE_NAME, payload: name });
		dispatch(loadUser());
	} catch (error) {
		dispatch({ type: DECK_ERROR });
	}
};

export const addCard = (card) => async (dispatch) => {
	try {
		dispatch({ type: ADD_CARD, payload: card });
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
