import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard, incrementCard, changeImage } from '../../actions/deck';
import getCardInfo from '../../utils/functions/getCardInfo';

import jsonNames from '../../utils/json/names.json';

const SearchBar = ({
	deckId,
	addCard,
	types,
	isAuthenticated,
	incrementCard,
	changeImage,
	deckImage,
}) => {
	const [query, setQuery] = useState({
		userQuery: '',
		loading: false,
		error: false,
		resIndex: 0,
	});

	const [results, setResults] = useState(['']);

	const { userQuery, loading, error, resIndex } = query;

	const keyPress = (e) => {
		setQuery({ ...query, error: false });
		if (e.key === 'Enter') {
			searchCard();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (resIndex < results.length - 1) {
				setQuery({ ...query, resIndex: resIndex + 1 });
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (resIndex > 0) {
				setQuery({ ...query, resIndex: resIndex - 1 });
			}
		}
	};

	const searchCard = async () => {
		if (userQuery !== '') {
			setQuery({ ...query, loading: true });

			//If saved, save card to database
			if (results.length > 0) {
				const name = results[resIndex];
				const card = await getCardInfo(name);

				var exists = false;
				for (var i = 0; i < types.length; ++i) {
					for (var j = 0; j < types[i].cards.length; ++j) {
						if (types[i].cards[j].name.toString() === name) {
							incrementCard(name);
							exists = true;
							break;
						}
					}
				}
				if (!exists) {
					await addCard(card);
					if (
						deckImage ===
						'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
					) {
						changeImage(card.cardArt, deckId);
					}
				}

				if (isAuthenticated) {
					const config = {
						headers: {
							'Content-Type': 'application/json',
						},
					};

					const body = await JSON.stringify({ card });

					await axios
						.put(`/api/deck/types/${deckId}/${name}`, body, config)
						.then(() => {
							setQuery({ ...query, loading: false, userQuery: '' });
						})
						.catch(() => {
							setQuery({ ...query, error: true, loading: false });
						});
				}

				setQuery({
					...query,
					resIndex: 0,
					userQuery: '',
					loading: false,
					error: false,
				});
				setResults(['']);
			}
		}
	};

	return (
		<div className="searchArea">
			<input
				className="searchBar"
				value={userQuery}
				style={{ opacity: '70%', color: error ? 'red' : null }}
				onChange={(e) => {
					setQuery({ ...query, userQuery: e.target.value, resIndex: 0 });
					var recommendArray = [];

					if (e.target.value !== '') {
						let name = '';
						const cardQuery = e.target.value.toUpperCase();

						for (var index = 0; index < jsonNames.length; ++index) {
							if (jsonNames[index].toUpperCase().startsWith(cardQuery)) {
								if (name === '') {
									name = jsonNames[index];
								}
								var tempName = jsonNames[index];
								recommendArray.push(tempName);
							}
						}
						if (recommendArray.length > 0) {
							setResults(recommendArray);
						} else {
							setQuery({ ...query, error: true, userQuery: e.target.value });
						}
					} else {
						setResults(['']);
					}
				}}
				onKeyDown={(e) => {
					keyPress(e);
				}}
			></input>
			<input
				className="ghostBar"
				style={{ opacity: '50%' }}
				placeholder={
					userQuery !== ''
						? userQuery.concat(results[resIndex].slice(userQuery.length))
						: 'Search Card Name'
				}
				disabled
			></input>
			{loading ? <h3 className="searchLoading">Loading...</h3> : null}
		</div>
	);
};

SearchBar.propTypes = {
	types: PropTypes.array,
	addCard: PropTypes.func.isRequired,
	incrementCard: PropTypes.func.isRequired,
	changeImage: PropTypes.func.isRequired,
	deckImage: PropTypes.string,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	types: state.deck.types,
	isAuthenticated: state.auth.isAuthenticated,
	deckImage: state.deck.deckImage,
});

export default connect(mapStateToProps, {
	addCard,
	incrementCard,
	changeImage,
})(SearchBar);
