import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementCard, decrementCard } from '../../actions/deck';

import axios from 'axios';

export const Card = ({
	name,
	quantity,
	src,
	src2,
	incrementCard,
	decrementCard,
	removeCard,
	deckId,
	saved,
}) => {
	return (
		<div className="cardContainer">
			<div className="quantContainer">
				<div className="arrowContainer">
					<button
						className="upArrow"
						onClick={async () => {
							incrementCard(name);
							if (saved) {
								await axios.put(`/api/deck/cards/${deckId}/${name}`);
							}
						}}
					></button>
					<button
						className="downArrow"
						onClick={async () => {
							decrementCard(name);
							if (saved) {
								await axios.delete(`/api/deck/cards/${deckId}/${name}`);
							}
						}}
					></button>
				</div>
				<p className="cardQuantity">{`${quantity}x `}</p>
			</div>
			<a className="cardName">{name}</a>
			<img className="cardArt" src={src}></img>
			<img className="cardImage" src={src2}></img>
		</div>
	);
};

Card.propTypes = {
	incrementCard: PropTypes.func.isRequired,
	decrementCard: PropTypes.func.isRequired,
	deckId: PropTypes.string,
	saved: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	saved: state.deck.saved,
});

export default connect(mapStateToProps, { incrementCard, decrementCard })(Card);
