import React, { useState } from 'react';
import axios from 'axios';
import fetch from 'node-fetch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDeck, addCard, incrementCard } from '../../actions/deck';

const SCRYFALL_API = 'https://api.scryfall.com';

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
	});

	const { userQuery, loading, error } = query;

	const keyPress = (e) => {
		setQuery({ ...query, error: false });
		if (e.key === 'Enter') {
			searchCard();
		}
	};

	const searchCard = async () => {
		if (userQuery !== '') {
			setQuery({ ...query, loading: true });

			let name = '';
			await fetch(`${SCRYFALL_API}/catalog/card-names`)
				.then((response) => response.json())
				.then((json) => {
					const cardQuery = userQuery.toUpperCase();
					for (var index = 0; index < json.total_values; ++index) {
						if (json.data[index].toUpperCase().startsWith(cardQuery)) {
							name = json.data[index];
							break;
						}
					}
				})
				.catch((error) => {
					setQuery({ ...query, error: true, loading: false });
					return;
				});
			//Full Name Available

			//If saved, save card to database
			if (name !== '') {
				if (saved) {
					await axios
						.put(`/api/deck/cards/${deckId}/${name}`)
						.then((res) => {
							//If card already exists in deck, Increment
							if (
								cards.filter((card) => card.name.toString() === name).length > 0
							) {
								incrementCard(name);
							} else {
								addCard(res.data);
							}
						})
						.then(() => {
							setQuery({ ...query, loading: false, userQuery: '' });
						})
						.catch(() => {
							setQuery({ ...query, error: true, loading: false });
						});
				} else {
					//Else, just add card to current deck state
					let imageURL = '';
					let cardImageURL = '';
					await fetch(`${SCRYFALL_API}/cards/named?exact=${name}`)
						.then((response) => response.json())
						.then((json) => {
							imageURL = json.image_uris.art_crop;
							cardImageURL = json.image_uris.normal;
						})
						.catch((error) => {
							setQuery({ ...query, error: true, loading: false });
						});

					//Create new card
					const card = {
						name: name,
						quantity: 1,
						cardArt: imageURL,
						cardImage: cardImageURL,
					};
					//If card already exists in deck, Increment
					if (
						cards.filter((card) => card.name.toString() === name).length > 0
					) {
						incrementCard(name);
					} else {
						addCard(card);
					}
				}

				setQuery({ ...query, loading: false, userQuery: '' });
			} else {
				setQuery({ ...query, error: true, loading: false });
			}
		}
	};

	return (
		<div className="searchArea">
			<input
				className="searchBar"
				value={userQuery}
				onChange={(e) => setQuery({ ...query, userQuery: e.target.value })}
				onKeyPress={(e) => {
					keyPress(e);
				}}
			></input>
			<button
				className="searchButton"
				onClick={() => {
					searchCard();
				}}
			>
				Search Card
			</button>
			{loading ? <h3 className="searchLoading">Loading...</h3> : null}
			{error ? <h3 className="cardError">Cannot find card</h3> : null}
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
