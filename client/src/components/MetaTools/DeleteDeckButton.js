import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteDeck } from '../../actions/deck';

const DeleteDeckButton = ({ isAuthenticated, deckId, deleteDeck }) => {
	const [reconfirm, setReconfirm] = useState(false);

	if (isAuthenticated) {
		return (
			<div
				style={{
					textAlign: 'center',
					padding: '32px 0',
					width: '100%',
				}}
			>
				<h3 style={{ display: 'inline-block', margin: '16px 0' }}>
					Delete Deck
				</h3>
				{!reconfirm ? (
					<div>
						<button
							style={{
								display: 'inline-block',
								height: '16px',
								color: 'red',
							}}
							onClick={() => setReconfirm(true)}
						>
							Delete
						</button>
					</div>
				) : (
					<div>
						<p style={{ display: 'inline-block' }}>Are you sure?</p>
						<button
							style={{
								display: 'inline-block',
								marginLeft: '16px',
								width: '10%',
								height: '16px',
							}}
							onClick={() => setReconfirm(false)}
						>
							No
						</button>
						<button
							style={{
								display: 'inline-block',
								width: '10%',
								height: '16px',
								marginLeft: '24px',
								color: 'red',
							}}
							onClick={() => deleteDeck(deckId)}
						>
							Yes
						</button>
					</div>
				)}
			</div>
		);
	} else {
		return null;
	}
};

DeleteDeckButton.propTypes = {
	isAuthenticated: PropTypes.bool,
	deckId: PropTypes.string,
	deleteDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	deckId: state.deck.deckId,
});

export default connect(mapStateToProps, { deleteDeck })(DeleteDeckButton);
