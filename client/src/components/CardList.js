import React from 'react';
import Card from './Card';

export const CardList = ({ cards }) => {
	if (cards.length > 0) {
		return cards.map((card) => (
			<Card
				key={card.name}
				name={card.name}
				quantity={card.quantity}
				src={card.image}
			/>
		));
	}

	return null;
};

export default CardList;
