import React, { Fragment } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import DeckList from './components/DeckList';
import Header from './components/Header';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Fragment>
				<Header />
				<DeckList />
			</Fragment>
		</Provider>
	);
}

export default App;
