import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDeck, closeDeck, saveDeck } from '../../actions/deck';

const NewDeckButton = ({
	isAuthenticated,
	decks,
	openDeck,
	closeDeck,
	saveDeck,
}) => {
	return (
		<Fragment>
			<button
				className="createDeckButton"
				style={{
					border: '1px outset',
					fontSize: '60px',
					color: 'var(--main-bg-color)',
					backgroundColor: 'black',
					margin: '16px',
					opacity: '40%',
					width: '200px',
					minWidth: '200px',
					height: '200px',
					minHeight: '100%',
					cursor: 'pointer',
					borderRadius: '15px',
				}}
				onClick={() => {
					closeDeck();
					openDeck(-1);
					if (isAuthenticated) {
						saveDeck([], `untitled ${decks.length + 1}`);
					}
				}}
			>
				+
			</button>
		</Fragment>
	);
};

NewDeckButton.propTypes = {
	showDeck: PropTypes.bool,
	decks: PropTypes.array,
	saved: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	openDeck: PropTypes.func.isRequired,
	closeDeck: PropTypes.func.isRequired,
	saveDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	showDeck: state.deck.showDeck,
	decks: state.deck.decks,
	saved: state.deck.saved,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { openDeck, closeDeck, saveDeck })(
	NewDeckButton
);
