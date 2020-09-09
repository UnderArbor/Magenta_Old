import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import CardList from './CardList';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.searched = this.searched.bind(this);
	}

	state = {
		isLoading: true,
		cards: [],
		searched: false,
	};

	async componentDidMount() {
		if (this.state.isLoading) {
			console.log('Going in...');
			await axios
				.get('/api/deck/testDeck')
				.then((res) => {
					console.log('Success');
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
			console.log('Going in, again...');
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
		}
	}

	searched() {
		console.log('touched');
		setTimeout(() => {
			this.setState({ searched: true });
		}, 0);
	}

	render() {
		return (
			<div className="deckContent">
				<SearchBar searched={this.searched} />
				<hr />
				{!this.state.isLoading ? (
					<CardList cards={this.state.cards} />
				) : (
					<div>Loading...</div>
				)}
			</div>
		);
	}
}

export default Deck;
