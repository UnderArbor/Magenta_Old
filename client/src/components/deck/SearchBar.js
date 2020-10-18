import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDeck, addCard, incrementCard } from '../../actions/deck';
import getCardInfo from '../../utils/functions/getCardInfo';

import jsonNames from '../../utils/json/names.json';

const SearchBar = ({
	deckId,
	saved,
	addCard,
	cards,
	incrementCard,
	closeDeck,
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

				if (cards.filter((card) => card.name.toString() === name).length > 0) {
					incrementCard(name);
				} else {
					await addCard(card);
				}

				if (saved) {
					const config = {
						headers: {
							'Content-Type': 'application/json',
						},
					};

					const body = await JSON.stringify({ card });

					await axios
						.put(`/api/deck/cards/${deckId}/${name}`, body, config)
						.then(() => {
							setQuery({ ...query, loading: false, userQuery: '' });
						})
						.catch(() => {
							setQuery({ ...query, error: true, loading: false });
						});
				}
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
					!error
						? userQuery.concat(results[resIndex].slice(userQuery.length))
						: null
				}
				disabled
			></input>
			{loading ? <h3 className="searchLoading">Loading...</h3> : null}
			{saved ? (
				<div
					style={{
						display: 'inline-block',
						order: '5',
						marginLeft: 'auto',
						marginRight: '12px',
					}}
				>
					<button
						style={{
							border: '0',
							backgroundColor: 'red',
							color: 'white',
							fontSize: '24px',
							padding: '0 12px',
						}}
						onClick={() => {
							axios.delete(`api/deck/single/${deckId}`).then(() => closeDeck());
						}}
					>
						Delete Deck
					</button>
				</div>
			) : null}
		</div>
	);
};

SearchBar.propTypes = {
	saved: PropTypes.bool,
	cards: PropTypes.array,
	addCard: PropTypes.func.isRequired,
	incrementCard: PropTypes.func.isRequired,
	closeDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	saved: state.deck.saved,
	cards: state.deck.cards,
});

export default connect(mapStateToProps, { addCard, incrementCard, closeDeck })(
	SearchBar
);
