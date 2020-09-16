import React, { Component, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { badCard } from '../actions/index';
import store from '../store.js';

// axios.defaults.baseURL =
// 	window.location.protocol + '//' + window.location.hostname + ':4000';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.searchInput = React.createRef();
		this.focus = this.focus.bind(this);
	}

	focus() {
		this.searchInput.current.focus();
	}

	state = {
		userQuery: '',
		loading: false,
		error: false,
	};

	searchCard = async () => {
		if (this.state.userQuery !== '') {
			this.setState({ loading: true });
			axios
				.put(`/api/deck/cards/testDeck/${this.state.userQuery}`)
				.then((response) => {
					this.setState({
						loading: false,
						userQuery: '',
					});
					this.focus();
					this.props.searched();
				})
				.catch((error) => {
					this.setState({ error: true, loading: false });
				});
		}
	};

	keyPress = (e) => {
		this.setState({ error: false });
		if (e.key === 'Enter') {
			this.searchCard();
		}
	};

	render() {
		return (
			<div className="searchArea">
				<input
					autoFocus
					ref={this.searchInput}
					className="searchBar"
					value={this.state.userQuery}
					onChange={(e) => this.setState({ userQuery: e.target.value })}
					onKeyPress={(e) => {
						this.keyPress(e);
					}}
				></input>
				<button
					className="searchButton"
					onClick={() => {
						this.searchCard();
					}}
				>
					Search Card
				</button>
				{this.state.loading ? (
					<h3 className="searchLoading">Loading...</h3>
				) : null}
				{this.state.error ? (
					<h3 className="cardError">Cannot find card</h3>
				) : null}
				<hr />
			</div>
		);
	}
}

export default SearchBar;
