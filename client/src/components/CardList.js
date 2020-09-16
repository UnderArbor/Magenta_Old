import React from 'react';
import Card from './Card';

export const CardList = ({ cards, changed }) => {
	if (cards.length > 0) {
		return cards.map((card) => (
			<Card
				key={card.name}
				name={card.name}
				quantity={card.quantity}
				src={card.image}
				changed={changed}
			/>
		));
	}

	return null;
};

export default CardList;
