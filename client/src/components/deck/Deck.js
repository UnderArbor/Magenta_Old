import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardList from '../card/CardList';
import SearchBar from './SearchBar';
import DeckNameDisplay from './DeckNameDisplay';

import { openModalAuth } from '../../actions/auth';
import { saveName, heightChange } from '../../actions/deck';
import axios from 'axios';

const Deck = ({
	showDeck,
	loading,
	isAuthenticated,
	deckId,
	saveName,
	deckName,
	cards,
	heightChange,
}) => {
	const [tempName, setTempName] = useState('');

	useEffect(() => {
		setTempName('');
	}, [deckId]);

	useLayoutEffect(() => {
		setTimeout(function () {
			const element = document.querySelector('div.deckbuilderZone');
			heightChange(element);
		}, 1000);
	}, [cards, heightChange]);

	if (!showDeck) {
		return (
			<div
				className="wholeDeck"
				id="wholeDeck"
				style={{
					color: 'lightgray',
					textAlign: 'center',
					display: 'block',
					fontSize: '32px',
					alignItems: 'center',
					margin: '0',
					paddingTop: '25%',
				}}
			>
				No Deck Loaded<div style={{ fontSize: '16px' }}>Import deck here</div>
			</div>
		);
	}

	const keyPress = async (e) => {
		if (tempName !== '' && (e.key === 'Enter' || e === 'blur')) {
			if (isAuthenticated) {
				await axios
					.put(`/api/deck/${deckId}/${tempName}`)
					.then((res) => saveName(res.data.name));
			} else {
				saveName(tempName);
			}
			setTempName('');
		}
	};

	return (
		<Fragment>
			<div className="wholeDeck">
				<div
					className="deckContent"
					style={{
						width: '100%',
					}}
				>
					<DeckNameDisplay
						deckName={deckName}
						tempName={tempName}
						setTempName={setTempName}
						keyPress={keyPress}
					/>

					<SearchBar deckId={deckId} />

					<hr className="normal" />
					{!loading ? <CardList /> : <div>Loading...</div>}
				</div>
			</div>
		</Fragment>
	);
};

Deck.propTypes = {
	showDeck: PropTypes.bool,
	loading: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	openModalAuth: PropTypes.func.isRequired,
	saveName: PropTypes.func.isRequired,
	deckId: PropTypes.string,
	deckName: PropTypes.string,
	cards: PropTypes.array,
	heightChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	showDeck: state.deck.showDeck,
	loading: state.deck.loading,
	isAuthenticated: state.auth.isAuthenticated,
	deckId: state.deck.deckId,
	deckName: state.deck.deckName,
	cards: state.deck.cards,
});

export default connect(mapStateToProps, {
	openModalAuth,
	saveName,
	heightChange,
})(Deck);
