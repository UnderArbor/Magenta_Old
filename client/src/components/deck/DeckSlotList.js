import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeckSlot from './DeckSlot';

const DeckSlotList = ({ user, isAuthenticated }) => {
	if (isAuthenticated && user && user.decks.length > 0) {
		console.log('Load Deck List');
		return user.decks.map(({ _id }) => <DeckSlot key={_id} id={_id} />);
	}

	return null;
};

DeckSlotList.propTypes = {
	user: PropTypes.object,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(DeckSlotList);
