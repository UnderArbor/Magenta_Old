import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDeck, closeDeck, saveDeck } from '../../actions/deck';

const NewDeckButton = ({
	isAuthenticated,
	types,
	openDeck,
	closeDeck,
	saveDeck,
}) => {
	return (
		<Fragment>
			<button
				className="createDeckButton"
				onClick={() => {
					closeDeck();
					openDeck(-1);
					if (isAuthenticated) {
						saveDeck(
							[
								{ name: 'Creature', open: true, cards: [] },
								{ name: 'Enchantment', open: true, cards: [] },
								{ name: 'Artifact', open: true, cards: [] },
								{ name: 'Planeswalker', open: true, cards: [] },
								{ name: 'Instant', open: true, cards: [] },
								{ name: 'Sorcery', open: true, cards: [] },
								{ name: 'Land', open: true, cards: [] },
								{ name: 'Hero', open: true, cards: [] },
								{ name: 'Vanguard', open: true, cards: [] },
								{ name: 'Conspiracy', open: true, cards: [] },
								{ name: 'Scheme', open: true, cards: [] },
								{ name: 'Plane', open: true, cards: [] },
								{ name: 'Phenomenon', open: true, cards: [] },
							],
							`untitled`
						);
					}
				}}
			>
				New Deck
			</button>
		</Fragment>
	);
};

NewDeckButton.propTypes = {
	showDeck: PropTypes.bool,
	saved: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	types: PropTypes.array,
	openDeck: PropTypes.func.isRequired,
	closeDeck: PropTypes.func.isRequired,
	saveDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	showDeck: state.deck.showDeck,
	saved: state.deck.saved,
	isAuthenticated: state.auth.isAuthenticated,
	types: state.deck.types,
});

export default connect(mapStateToProps, { openDeck, closeDeck, saveDeck })(
	NewDeckButton
);
