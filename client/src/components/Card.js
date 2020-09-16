import React from 'react';
import axios from 'axios';

axios.defaults.baseURL =
	window.location.protocol + '//' + window.location.hostname + ':4000';

export const Card = ({ name, quantity, src, src2, changed }) => {
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
			<div className="arrowContainer">
				<button className="upArrow" onClick={() => addCard()}></button>
				<button className="downArrow" onClick={() => removeCard()}></button>
			</div>
			<a className="cardName">{name}</a>
			<img
				className="cardArt"
				src={src}
				// onMouseOver={() =>
				// 	(document.querySelector('.cardImage').style = 'display: block')
				// }
				// onMouseOut={() =>
				// 	(document.querySelector('.cardImage').style = 'display: none')
				// }
			></img>
			{/* <img className="cardImage" src={src2}></img> */}
		</div>
	);
};

export default Card;
