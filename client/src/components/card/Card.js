import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementCard, decrementCard, changeImage } from '../../actions/deck';
import CardArt from './CardArt';

import axios from 'axios';

export const Card = ({
	index,
	name,
	quantity,
	src,
	src2,
	incrementCard,
	decrementCard,
	changeImage,
	deckId,
	isAuthenticated,
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

	function handleDragStart(e) {
		this.style.opacity = '0.4';

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', this.src);
	}

	function handleDragEnd(e) {
		this.style.opacity = '1';
	}

	function handleDragEnter(e) {
		if (this.dataset.id === deckId) {
			this.classList.add('newArtDeck');
		}
	}

	function handleDragOver(e) {
		if (e.preventDefault()) {
			e.preventDefault();
		}

		e.dataTransfer.dropEffect = 'move';

		return false;
	}

	function handleDragLeave(e) {
		e.preventDefault();
		this.classList.remove('newArtDeck');
	}

	async function handleDrop(e) {
		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}
		e.preventDefault();
		if (this.dataset.id === deckId) {
			const newURL = e.dataTransfer.getData('text/plain');
			if (newURL !== this.src) {
				this.classList.remove('newArtDeck');
				if (newURL) {
					changeImage(newURL, deckId);
				}
			}
		}
		this.style.opacity = '1';
		e.dataTransfer.clearData();
		return false;
	}

	let targetArt = document.querySelectorAll('.cardArt');
	targetArt.forEach(function (item) {
		item.addEventListener('dragstart', handleDragStart, false);
		item.addEventListener('dragend', handleDragEnd, false);
	});

	let thisDeck = document.querySelectorAll('.deckButton');
	thisDeck.forEach(function (item) {
		item.addEventListener('dragenter', handleDragEnter, false);
		item.addEventListener('dragover', handleDragOver, false);
		item.addEventListener('dragleave', handleDragLeave, false);
		item.addEventListener('drop', handleDrop, false);
	});

	const cardArt = [];

	for (var i = 0; i < quantity; ++i) {
		if (i === 0) {
			cardArt.push(
				<CardArt
					key={i}
					src={src}
					offset={i}
					zIndex={4}
					position={'relative'}
					vOffset={i}
					className={'cardArt'}
				/>
			);
		} else if (i < 4) {
			cardArt.push(
				<CardArt
					key={i}
					src={src}
					offset={`${i * 4}px`}
					zIndex={`${4 - i}`}
					position={'absolute'}
					vOffset={`${i * -2}px`}
					className={'cardArt'}
				/>
			);
		} else {
			cardArt.push(
				<CardArt
					key={i}
					src={src}
					offset={`${i * 4}px`}
					zIndex={`${4 - i}`}
					position={'absolute'}
					vOffset={`${i * -2}px`}
					className={'moreCards'}
				/>
			);
			break;
		}
	}

	return (
		<div className="cardContainer">
			<div className="cardInfo" onMouseMove={(e) => handleMouseMove(e)}>
				<div className="cardArtContainer">
					{cardArt}
					<div className="quantContainer">
						<div className="arrowContainer">
							<button
								className="arrow down"
								onClick={async () => {
									decrementCard(name);
									if (isAuthenticated) {
										await axios.delete(`/api/deck/cards/${deckId}/${name}`);
									}
								}}
							>
								-
							</button>
							<button
								className="arrow up"
								onClick={async () => {
									incrementCard(name);
									if (isAuthenticated) {
										await axios.put(`/api/deck/cards/${deckId}/${name}`);
									}
								}}
							>
								+
							</button>
						</div>
						<div className="cardQuantity">{`${quantity}x `}</div>
					</div>
				</div>
				<div className="infoContainer">
					<div className="cardName">{name}</div>
				</div>
				<img
					draggable="false"
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
	changeImage: PropTypes.func.isRequired,
	deckId: PropTypes.string,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
	incrementCard,
	decrementCard,
	changeImage,
})(Card);
