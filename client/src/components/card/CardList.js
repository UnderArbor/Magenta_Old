import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './Card';

export const CardList = ({ cards }) => {
	if (cards.length > 0) {
		return cards.map((card, index) => (
			<Card
				key={card.name}
				name={card.name}
				index={index}
				quantity={card.quantity}
				src={card.cardArt}
				src2={card.cardImage}
			/>
		));
	}

	return null;
};

CardList.propTypes = {
	cards: PropTypes.array,
};

const mapStateToProps = (state) => ({
	cards: state.deck.cards,
});

export default connect(mapStateToProps)(CardList);
