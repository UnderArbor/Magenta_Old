import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewDeckButton from './NewDeckButton';
import DeckSlotList from './DeckSlotList';

export const DeckList = ({ user, isAuthenticated }) => {
	return (
		<Fragment>
			<div className="deckList">
				<p className="ownerName">
					{isAuthenticated && user ? `${user.name}'s` : 'Your'} Decks
				</p>
				<hr className="normal" />
				<div className="deckSlots">
					<NewDeckButton />
					<DeckSlotList />
				</div>
				<hr className="normal" />
			</div>
		</Fragment>
	);
};

DeckList.propTypes = {
	user: PropTypes.object,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(DeckList);
