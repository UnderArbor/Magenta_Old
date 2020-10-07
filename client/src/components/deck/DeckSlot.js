import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { openDeck, closeDeck } from '../../actions/deck';

const DeckSlot = ({ id, deckId, openDeck, closeDeck, globalDeckName }) => {
	const [deckName, setDeckName] = useState('loading...');

	const getName = async () => {
		try {
			await axios.get(`/api/deck/${id}`).then((res) => {
				setDeckName(res.data.name);
			});
		} catch (error) {
			console.log('Deck not found');
		}
	};

	var slotFormat;

	if (id === deckId) {
		slotFormat = 'selectedDeck';
		if (deckName !== globalDeckName) {
			setDeckName(globalDeckName);
		}
	} else {
		slotFormat = 'deckSlot';
		getName();
	}

	return (
		<div className={slotFormat}>
			<button
				style={{
					margin: '16px 24px',
					width: '160px',
					height: '160px',
					cursor: 'pointer',
					borderRadius: '15px',
					border: '1px outset',
				}}
				onClick={() => {
					if (id === deckId) {
						closeDeck();
					} else {
						openDeck(id);
					}
				}}
			>
				Open Deck
			</button>
			<center>{deckName}</center>
		</div>
	);
};

DeckSlot.propTypes = {
	openDeck: PropTypes.func.isRequired,
	closeDeck: PropTypes.func.isRequired,
	deckId: PropTypes.string,
	globalDeckName: PropTypes.string,
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	globalDeckName: state.deck.deckName,
});

export default connect(mapStateToProps, { openDeck, closeDeck })(DeckSlot);
