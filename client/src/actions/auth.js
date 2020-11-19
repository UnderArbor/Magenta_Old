import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SHOW_MODAL,
	HIDE_MODAL,
	CLOSE_DECK,
	LOAD_DECK_LIST,
	CLOSE_TOOLS,
} from './types';
import setAuthToken from '../utils/functions/setAuthToken';

export const loadUser = () => async (dispatch) => {
	if (localStorage.getItem('token')) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});

		dispatch({
			type: LOAD_DECK_LIST,
			payload: res.data.decks,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const openModalAuth = () => (dispatch) => {
	dispatch({
		type: SHOW_MODAL,
	});
};

export const closeModalAuth = () => (dispatch) => {
	dispatch({
		type: HIDE_MODAL,
	});
};

export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ name, email, password });
	try {
		let res = '';
		await axios.post('api/user', body, config).then((response) => {
			res = response;
		});
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(error.msg);

		if (errors) {
			errors.forEach((error) => console.log(error));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

//Login User
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post('api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		dispatch({ type: CLOSE_TOOLS });
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(error.msg);

		if (errors) {
			errors.forEach((error) => console.log(error));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	setAuthToken(null);
	dispatch({ type: CLOSE_DECK });
	dispatch({
		type: LOGOUT,
	});
};
