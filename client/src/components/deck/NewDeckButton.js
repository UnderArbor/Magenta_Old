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
				style={{ opacity: '40%' }}
				onMouseEnter={(e) => (e.target.style.opacity = '60%')}
				onMouseLeave={(e) => (e.target.style.opacity = '40%')}
				onClick={() => {
					closeDeck();
					openDeck(-1);
					if (isAuthenticated) {
						saveDeck([], `untitled`);
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
