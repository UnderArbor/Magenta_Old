import React from 'react';

export const Card = ({ name, quantity, src }) => {
	return (
		<div className="cardContainer">
			<p className="cardQuantity">{`${quantity}x `}</p>
			<a className="cardName">{name}</a>
			<img className="cardImage" src={src}></img>
		</div>
	);
};

export default Card;
