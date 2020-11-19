import React from 'react';
import Card from './Card';
import TypeHeader from './TypeHeader';

const TypeArea = ({ type, cards, indexBuffer }) => {
	return (
		<div className="typeArea" style={{ width: '100%', float: 'left' }}>
			<TypeHeader type={type} />
			<hr style={{ marginBottom: '16px' }} className="normal" />
			<div className="typeGroupContainer">
				{cards.map((card, index) => (
					<Card
						key={card.name}
						name={card.name}
						index={index + indexBuffer}
						quantity={card.quantity}
						src={card.cardArt}
						src2={card.cardImage}
					/>
				))}
			</div>
		</div>
	);
};

export default TypeArea;
