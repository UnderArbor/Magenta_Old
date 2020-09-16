import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import DeckList from './components/DeckList';
import Header from './components/Header';
import store from './store';

function App() {
	return (
		<Fragment>
			<Header />
			<DeckList />
		</Fragment>
	);
}

export default App;
