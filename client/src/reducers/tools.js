import {
	OPEN_TOOLS,
	CLOSE_TOOLS,
	COLUMN_CHANGE,
	SHOW_COLORS,
	HIDE_COLORS,
	SHOW_QUANTITY,
	HIDE_QUANTITY,
	TOOLS_ERROR,
} from '../actions/types';

const initialState = {
	tools: false,
	columnCount: 2,
	colorDisp: true,
	quantityDisp: true,
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
		case SHOW_COLORS:
			return { ...state, colorDisp: true };
		case HIDE_COLORS:
			return { ...state, colorDisp: false };
		case SHOW_QUANTITY:
			return { ...state, quantityDisp: true };
		case HIDE_QUANTITY:
			return { ...state, quantityDisp: false };
		case TOOLS_ERROR:
			return { ...state };
		default:
			return state;
	}
}
