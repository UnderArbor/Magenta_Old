import {
	OPEN_TOOLS,
	CLOSE_TOOLS,
	COLUMN_CHANGE,
	SHOW_COLORS,
	HIDE_COLORS,
	SHOW_QUANTITY,
	HIDE_QUANTITY,
	TOOLS_ERROR,
} from './types';

export const openTools = () => async (dispatch) => {
	try {
		dispatch({
			type: OPEN_TOOLS,
		});
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};

export const closeTools = () => async (dispatch) => {
	try {
		dispatch({
			type: CLOSE_TOOLS,
		});
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};

export const showColors = () => async (dispatch) => {
	try {
		dispatch({
			type: SHOW_COLORS,
		});
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};

export const hideColors = () => async (dispatch) => {
	try {
		dispatch({
			type: HIDE_COLORS,
		});
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};

export const showQuantity = () => async (dispatch) => {
	try {
		dispatch({
			type: SHOW_QUANTITY,
		});
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};

export const hideQuantity = () => async (dispatch) => {
	try {
		dispatch({
			type: HIDE_QUANTITY,
		});
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};

export const columnChange = (columnCount) => async (dispatch) => {
	try {
		if (columnCount > 0 && columnCount < 4) {
			dispatch({
				type: COLUMN_CHANGE,
				payload: columnCount,
			});
		} else dispatch({ type: TOOLS_ERROR });
	} catch (error) {
		dispatch({
			type: TOOLS_ERROR,
		});
	}
};
