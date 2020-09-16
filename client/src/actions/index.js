import { ADD_CARD } from './types';

export const addCard = (deck, card) => (dispatch) => {
	dispatch({
		type: ADD_CARD,
		payload: { deck, card },
	});
};
