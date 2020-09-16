import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import CardList from './CardList';

// axios.defaults.baseURL =
// 	window.location.protocol + '//' + window.location.hostname + ':4000';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.searched = this.searched.bind(this);
		this.changed = this.changed.bind(this);
	}

	state = {
		isLoading: true,
		cards: [],
		searched: false,
		changed: false,
	};

	async componentDidMount() {
		if (this.state.isLoading) {
			await axios
				.get('/api/deck/testDeck')
				.then((res) => {
					const cards = res.data.cards;
					this.setState({ cards });
					this.setState({ isLoading: false });
				})
				.catch((error) => {
					console.log(error.reponse);
				});
		}
	}

	async componentDidUpdate() {
		if (this.state.searched) {
			this.setState({ searched: false });
			await axios
				.get('/api/deck/testDeck')
				.then((res) => {
					const cards = res.data.cards;
					this.setState({ cards });
					this.setState({ isLoading: false });
				})
				.catch((error) => {
					console.log(error.reponse);
				});
		} else if (this.state.changed) {
			await axios
				.get('/api/deck/testDeck')
				.then((res) => {
					const cards = res.data.cards;
					this.setState({ cards });
					this.setState({ changed: false });
				})
				.catch((error) => {
					console.log(error.reponse);
				});
		}
	}

	searched() {
		this.setState({ searched: true });
	}

	changed() {
		this.setState({ changed: true });
	}

	render() {
		return (
			<div className="deckContent">
				<SearchBar searched={this.searched} />
				<hr />
				{!this.state.isLoading ? (
					<CardList cards={this.state.cards} changed={this.changed} />
				) : (
					<div>Loading...</div>
				)}
			</div>
		);
	}
}

export default Deck;
