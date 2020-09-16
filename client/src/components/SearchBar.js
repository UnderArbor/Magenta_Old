import React, { Component, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL =
	process.env.baseURL ||
	window.location.protocol + '//' + window.location.hostname + ':4000';

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
				></input>
				<button
					className="searchButton"
					onClick={() => {
						if (this.state.userQuery !== '') {
							this.setState({ loading: true });
							axios
								.put(`/api/deck/cards/testDeck/${this.state.userQuery}`)
								.then((response) => {
									this.setState({ loading: false, userQuery: '' });
									this.focus();
									this.props.searched();
								})
								.catch((error) => {
									console.log(error.reponse);
								});
						}
					}}
				>
					Search Card
				</button>
				{this.state.loading ? (
					<h3 className="searchLoading">Loading...</h3>
				) : null}
				<hr />
			</div>
		);
	}
}

export default SearchBar;
