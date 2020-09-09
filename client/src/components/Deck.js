import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import CardList from './CardList';

axios.defaults.baseURL =
	window.location.protocol + '//' + window.location.hostname + ':4000';

// function Cards({ cards }) {
// 	if (cards.length > 0) {
// 		return cards.map((card) => <img key={card.name} src={card.image} />);
// 	}

// 	return null;
// }

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
		console.log('Going in, again...');
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
