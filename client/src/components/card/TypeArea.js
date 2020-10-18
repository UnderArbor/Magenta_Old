import React from 'react';
import Card from './Card';

const TypeArea = ({ type, cards, indexBuffer }) => {
	return (
		<div
			style={{
				margin: '16px',
				width: '45%',
			}}
		>
			<div
				style={{
					color: 'var(--secondary-color)',
					fontSize: '36px',
				}}
			>
				{type}
			</div>
			<hr style={{ marginBottom: '16px' }} className="normal" />
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
	);
};

export default TypeArea;
