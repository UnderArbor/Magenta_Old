import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openModalAuth } from '../../actions/auth';

import DeckSlot from './DeckSlot';

const DeckSlotList = ({ decks, isAuthenticated, openModalAuth, func }) => {
	if (isAuthenticated && decks.length > 0) {
		return decks.map(({ _id }) => <DeckSlot func={func} key={_id} id={_id} />);
	} else if (!isAuthenticated) {
		return (
			<div
				className="blockedDeckList"
				style={{
					backgroundColor: 'black',
					width: '100%',
					height: '100%',
				}}
			>
				<button
					onClick={() => {
						openModalAuth();
					}}
					style={{
						width: '100%',
						height: '100%',
						border: 'none',
						backgroundColor: 'black',
						top: '50%',
						textAlign: 'center',
						color: 'white',
						fontSize: '24px',
						cursor: 'pointer',
					}}
				>
					Must register or login to access saved decks
				</button>
			</div>
		);
	}

	return null;
};

DeckSlotList.propTypes = {
	decks: PropTypes.array,
	isAuthenticated: PropTypes.bool,
	openModalAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	decks: state.deck.decks,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { openModalAuth })(DeckSlotList);
