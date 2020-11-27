import React, { useState, useRef } from 'react';
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
	const cardImage = useRef(null);

	const [ghostCoords, setGhostCoords] = useState({
		leftCoord: 0,
		topCoord: 0,
		flippedY: false,
		flippedX: false,
	});

	const { leftCoord, topCoord, flippedY, flippedX } = ghostCoords;

	const handleMouseMove = (e) => {
		const buffer = 4;

		const windowHeight =
			window.innerHeight || document.documentElement.clientHeight;

		const windowWidth =
			window.innerWidth || document.documentElement.clientWidth;

		const image = document.getElementsByClassName('cardImage');
		const bounding = image[index].getBoundingClientRect();

		//Flip vertically and horizontally
		if (
			(bounding.bottom > windowHeight ||
				(flippedY === true &&
					bounding.bottom + bounding.height > windowHeight)) &&
			(bounding.right > windowWidth ||
				(flippedX === true && bounding.right + bounding.width > windowWidth))
		) {
			setGhostCoords({
				leftCoord: e.nativeEvent.pageX - buffer - bounding.width + 'px',
				topCoord: e.nativeEvent.pageY - buffer - bounding.height + 'px',
				flippedY: true,
				flippedX: true,
			});

			//Flip vertically
		} else if (
			bounding.bottom > windowHeight ||
			(flippedY === true && bounding.bottom + bounding.height > windowHeight)
		) {
			setGhostCoords({
				leftCoord: e.nativeEvent.pageX + 1 + 'px',
				topCoord: e.nativeEvent.pageY - buffer - bounding.height + 'px',
				flippedY: true,
				flippedX: false,
			});

			//Flip horizontally
		} else if (
			bounding.right > windowWidth ||
			(flippedX === true && bounding.right + bounding.width > windowWidth)
		) {
			setGhostCoords({
				leftCoord: e.nativeEvent.pageX - buffer - bounding.width + 'px',
				topCoord: e.nativeEvent.pageY + 1 + 'px',
				flippedY: false,
				flippedX: true,
			});

			//Standard orientation
		} else {
			setGhostCoords({
				leftCoord: e.nativeEvent.pageX + 1 + 'px',
				topCoord: e.nativeEvent.pageY + 1 + 'px',
				flippedY: false,
				flippedX: false,
			});
		}
	};

	function handleDragStart(e) {
		e.stopImmediatePropagation();
		this.style.opacity = '0.4';

		try {
			cardImage.current.classList.add('hidden');
		} catch (err) {}

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', this.src);
	}

	function handleDragEnd(e) {
		this.style.opacity = '1';
	}

	function handleDragEnter(e) {
		if (this.dataset.id === deckId) {
			console.log('classList: ', this.classList);
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
		e.stopImmediatePropagation();
		e.preventDefault();
		this.classList.remove('newArtDeck');
		if (this.dataset.id === deckId || !isAuthenticated) {
			const newURL = e.dataTransfer.getData('text/plain');
			if (newURL && newURL !== this.src) {
				changeImage(newURL, deckId);
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
					className={'cardArt moreCards'}
				/>
			);
			break;
		}
	}

	return (
		<div className="cardContainer">
			<div className="cardInfo">
				<div
					className="cardArtContainer"
					onMouseMove={(e) => handleMouseMove(e)}
					onMouseEnter={() => cardImage.current.classList.remove('hidden')}
					onMouseLeave={() => cardImage.current.classList.add('hidden')}
				>
					{cardArt}
					<div
						className="quantContainer"
						onMouseEnter={() => cardImage.current.classList.add('hidden')}
						onMouseLeave={() => cardImage.current.classList.remove('hidden')}
					>
						<div className="arrowContainer">
							<button
								className="arrow down"
								onClick={async () => {
									decrementCard(name);
									if (isAuthenticated) {
										await axios.delete(`/api/deck/types/${deckId}/${name}`);
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
										await axios.put(`/api/deck/types/${deckId}/${name}`);
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
					ref={cardImage}
					draggable="false"
					className="cardImage hidden"
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
