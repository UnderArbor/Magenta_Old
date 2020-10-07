import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openDeck, closeDeck } from '../../actions/deck';

const NewDeckButton = ({ showDeck, saved, openDeck, closeDeck }) => {
	return (
		<Fragment>
			<button
				className="createDeckButton"
				style={{
					border: '1px outset',
					fontSize: '60px',
					color: 'var(--main-bg-color)',
					backgroundColor: 'var(--backdrop-color)',
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
					if (!showDeck) {
						openDeck(-1);
					} else {
						if (saved) {
							closeDeck();
							openDeck(-1);
						} else {
							closeDeck();
						}
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
	saved: PropTypes.bool,
	openDeck: PropTypes.func.isRequired,
	closeDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	showDeck: state.deck.showDeck,
	saved: state.deck.saved,
});

export default connect(mapStateToProps, { openDeck, closeDeck })(NewDeckButton);
