import {
	OPEN_TOOLS,
	CLOSE_TOOLS,
	COLUMN_CHANGE,
	TOOLS_ERROR,
} from '../actions/types';

const initialState = {
	tools: false,
	columnCount: 2,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case OPEN_TOOLS:
			return { ...state, tools: true };
		case CLOSE_TOOLS:
			return { ...state, tools: false };
		case COLUMN_CHANGE:
			return { ...state, columnCount: payload };
		case TOOLS_ERROR:
			return { ...state };
		// return { ...state, tools: false };
		default:
			return state;
	}
}
