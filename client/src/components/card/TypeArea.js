import React from 'react';
import Card from './Card';
import TypeHeader from './TypeHeader';

const TypeArea = ({ type, cards, indexBuffer, index }) => {
	return (
		<div className="typeArea" style={{ width: '100%', float: 'left' }}>
			<TypeHeader type={type} index={index} />
			<hr style={{ marginBottom: '16px' }} className="normal" />
			<div className="typeGroupContainer">
				{cards.map((card, index) => (
					<Card
						key={card.name}
						name={card.name}
						index={index + indexBuffer}
						quantity={card.quantity}
						manaCost={card.manaCost}
						src={card.cardArt}
						src2={card.cardImage}
					/>
				))}
			</div>
			<div className="dropZone" data-id={index + 1}></div>
		</div>
	);
};

export default TypeArea;
