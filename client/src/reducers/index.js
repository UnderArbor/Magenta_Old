import { ADD_CARD } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_CARD:
			return { ...state };
		default:
			return;
	}
}
