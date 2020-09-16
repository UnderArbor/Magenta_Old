import { BAD_CARD } from './types';

export const badCard = (deck, card) => (dispatch) => {
	dispatch({
		type: BAD_CARD,
		payload: { error: 'bad_card' },
	});
};
