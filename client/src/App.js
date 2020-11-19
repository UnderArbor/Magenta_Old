import React, { Fragment, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './css/App.css';
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

	const scrollRef = useRef(null);

	const executeScroll = () => scrollRef.current.scrollIntoView();

	return (
		<Provider store={store}>
			<Fragment>
				<ModalAuthenticator />
				<Header />
				<div ref={scrollRef} className="deckbuilderZone">
					<DeckList func={executeScroll} />
					<Deck />
				</div>
			</Fragment>
		</Provider>
	);
};

export default App;
