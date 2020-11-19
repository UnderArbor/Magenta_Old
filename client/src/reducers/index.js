import { combineReducers } from 'redux';
import auth from './auth';
import deck from './deck';
import tools from './tools';

export default combineReducers({
	auth,
	deck,
	tools,
});
