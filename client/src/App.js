import React, { Fragment, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import DeckList from './components/deck/DeckList';
import Deck from './components/deck/Deck';
import Header from './components/Header';
import ModalAuthenticator from './components/ModalAuthenticator';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/functions/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Fragment>
				<ModalAuthenticator />
				<Header />
				<DeckList />
				<Deck />
			</Fragment>
		</Provider>
	);
};

export default App;
