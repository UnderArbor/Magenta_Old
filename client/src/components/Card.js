import React from 'react';
import axios from 'axios';

// axios.defaults.baseURL =
// 	window.location.protocol + '//' + window.location.hostname + ':4000';

export const Card = ({ name, quantity, src, changed }) => {
	const addCard = async () => {
		await axios.put(`/api/deck/cards/testDeck/${name}`);
		changed();
	};

	const removeCard = async () => {
		await axios.delete(`/api/deck/cards/testDeck/${name}`);
		changed();
	};

	return (
		<div className="cardContainer">
			<p className="cardQuantity">{`${quantity}x `}</p>
			<button className="upArrow" onClick={() => addCard()}>
				Up
			</button>
			<button className="downArrow" onClick={() => removeCard()}>
				Down
			</button>
			<a className="cardName">{name}</a>
			<img className="cardImage" src={src}></img>
		</div>
	);
};

export default Card;
