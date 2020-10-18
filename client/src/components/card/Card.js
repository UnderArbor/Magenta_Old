import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementCard, decrementCard } from '../../actions/deck';

import axios from 'axios';

export const Card = ({
	index,
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
	const [ghostCoords, setGhostCoords] = useState({
		leftCoord: 0,
		topCoord: 0,
		flipped: false,
	});

	const { leftCoord, topCoord, flipped } = ghostCoords;

	const handleMouseMove = (e) => {
		const windowHeight =
			window.innerHeight || document.documentElement.clientHeight;

		const image = document.getElementsByClassName('cardImage');
		const bounding = image[index].getBoundingClientRect();

		if (
			(bounding.bottom > windowHeight && flipped === false) ||
			(flipped === true && bounding.bottom + bounding.height > windowHeight)
		) {
			setGhostCoords({
				leftCoord: e.nativeEvent.pageX + 1 + 'px',
				topCoord: e.nativeEvent.pageY + 1 - bounding.height + 'px',
				flipped: true,
			});
		} else if (
			flipped === false ||
			(flipped === true && bounding.bottom + bounding.height < windowHeight)
		) {
			setGhostCoords({
				leftCoord: e.nativeEvent.pageX + 1 + 'px',
				topCoord: e.nativeEvent.pageY + 1 + 'px',
				flipped: false,
			});
		}
	};

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
			<div className="cardInfo" onMouseMove={(e) => handleMouseMove(e)}>
				<p className="cardName">{name}</p>
				<img className="cardArt" src={src} alt="Whoopsie"></img>
				<img
					className="cardImage"
					style={{ left: leftCoord, top: topCoord }}
					src={src2}
					alt="Doopsie"
				></img>
			</div>
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
