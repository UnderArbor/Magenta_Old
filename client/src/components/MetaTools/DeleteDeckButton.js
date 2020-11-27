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
				{!reconfirm ? (
					<div>
						<button
							style={{
								display: 'inline-block',
								color: 'darkRed',
								fontSize: '16px',
								fontWeight: 'bold',
								backgroundColor: 'lightPink',
								border: '1px solid black',
								borderRadius: '4px',
								width: '90%',
								height: 'auto',
								padding: '4px',
							}}
							onClick={() => setReconfirm(true)}
						>
							DELETE DECK
						</button>
					</div>
				) : (
					<div>
						<p
							style={{
								display: 'inline-block',
								fontWeight: 'bold',
								fontSize: '24px',
								textDecoration: 'underline',
							}}
						>
							Delete Deck?
						</p>
						<button
							style={{
								display: 'inline-block',
								width: '20%',
								marginLeft: '16px',
								color: 'green',
								backgroundColor: 'lightgreen',
								fontSize: '16px',
								height: 'auto',
								border: '1px solid black',
								borderRadius: '4px',
								fontWeight: 'bold',
								padding: '4px',
							}}
							onClick={() => setReconfirm(false)}
						>
							NO
						</button>
						<button
							style={{
								display: 'inline-block',
								width: '20%',
								marginLeft: '24px',
								color: 'red',
								backgroundColor: 'lightPink',
								fontSize: '16px',
								height: 'auto',
								border: '1px solid black',
								borderRadius: '4px',
								fontWeight: 'bold',
								padding: '4px',
							}}
							onClick={() => deleteDeck(deckId)}
						>
							YES
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
