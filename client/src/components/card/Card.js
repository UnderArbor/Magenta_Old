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
	manaCost,
	src,
	src2,
	incrementCard,
	decrementCard,
	changeImage,
	deckId,
	colorDisp,
	quantityDisp,
	isAuthenticated,
}) => {
	const cardImage = useRef(null);
	const manaContainer = useRef(null);
	const settings = useRef(null);

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

	const currentManaCost = [];

	for (var j = 0; j < manaCost.length; ++j) {
		if (!manaCost[j].includes('/')) {
			if (manaCost[j] === 'W') {
				currentManaCost.push(<li key={j} className="cardColorDot W" alt="W" />);
			} else if (manaCost[j] === 'U') {
				currentManaCost.push(<li key={j} className="cardColorDot U" alt="U" />);
			} else if (manaCost[j] === 'B') {
				currentManaCost.push(<li key={j} className="cardColorDot B" alt="B" />);
			} else if (manaCost[j] === 'G') {
				currentManaCost.push(<li key={j} className="cardColorDot G" alt="G" />);
			} else if (manaCost[j] === 'R') {
				currentManaCost.push(<li key={j} className="cardColorDot R" alt="R" />);
			} else if (manaCost[j] === 'C') {
				currentManaCost.push(<li key={j} className="cardColorDot C" alt="C" />);
			} else if (manaCost[j] === 'X') {
				currentManaCost.push(<li key={j} className="cardColorDot X" alt="X" />);
			} else if (manaCost[j] === 'S') {
				currentManaCost.push(<li key={j} className="cardColorDot S" alt="S" />);
			} else {
				if (Number(manaCost[j]) === 0) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana0" alt="0" />
					);
				} else if (Number(manaCost[j]) === 1) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana1" alt="1" />
					);
				} else if (Number(manaCost[j]) === 2) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana2" alt="2" />
					);
				} else if (Number(manaCost[j]) === 3) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana3" alt="3" />
					);
				} else if (Number(manaCost[j]) === 4) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana4" alt="4" />
					);
				} else if (Number(manaCost[j]) === 5) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana5" alt="5" />
					);
				} else if (Number(manaCost[j]) === 6) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana6" alt="6" />
					);
				} else if (Number(manaCost[j]) === 7) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana7" alt="7" />
					);
				} else if (Number(manaCost[j]) === 8) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana8" alt="8" />
					);
				} else if (Number(manaCost[j]) === 9) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana9" alt="9" />
					);
				} else if (Number(manaCost[j]) === 10) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana10" alt="10" />
					);
				} else if (Number(manaCost[j]) === 11) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana11" alt="11" />
					);
				} else if (Number(manaCost[j]) === 12) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana12" alt="12" />
					);
				} else if (Number(manaCost[j]) === 13) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana13" alt="13" />
					);
				} else if (Number(manaCost[j]) === 14) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana14" alt="14" />
					);
				} else if (Number(manaCost[j]) === 15) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana15" alt="15" />
					);
				} else if (Number(manaCost[j]) === 16) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana16" alt="16" />
					);
				} else if (Number(manaCost[j]) === 17) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana17" alt="17" />
					);
				} else if (Number(manaCost[j]) === 18) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana18" alt="18" />
					);
				} else if (Number(manaCost[j]) === 19) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana19" alt="19" />
					);
				} else if (Number(manaCost[j]) === 20) {
					currentManaCost.push(
						<li key={j} className="cardColorDot mana20" alt="20" />
					);
				}
			}
		} else {
			if (manaCost[j].includes('//')) {
				break;
			} else if (manaCost[j] === '2/U') {
				currentManaCost.push(
					<li key={j} className="cardColorDot Uor2" alt="2/U" />
				);
			} else if (manaCost[j] === '2/G') {
				currentManaCost.push(
					<li key={j} className="cardColorDot Gor2" alt="2/G" />
				);
			} else if (manaCost[j] === '2/R') {
				currentManaCost.push(
					<li key={j} className="cardColorDot Ror2" alt="2/R" />
				);
			} else if (manaCost[j] === '2/W') {
				currentManaCost.push(
					<li key={j} className="cardColorDot Wor2" alt="2/W" />
				);
			} else if (manaCost[j] === '2/B') {
				currentManaCost.push(
					<li key={j} className="cardColorDot Bor2" alt="2/B" />
				);
			} else if (manaCost[j] === 'R/W') {
				currentManaCost.push(
					<li key={j} className="cardColorDot RorW" alt="R/W" />
				);
			} else if (manaCost[j] === 'G/U') {
				currentManaCost.push(
					<li key={j} className="cardColorDot GorU" alt="G/U" />
				);
			} else if (manaCost[j] === 'B/G') {
				currentManaCost.push(
					<li key={j} className="cardColorDot BorG" alt="B/G" />
				);
			} else if (manaCost[j] === 'B/R') {
				currentManaCost.push(
					<li key={j} className="cardColorDot BorR" alt="B/R" />
				);
			} else if (manaCost[j] === 'G/W') {
				currentManaCost.push(
					<li key={j} className="cardColorDot GorW" alt="G/W" />
				);
			} else if (manaCost[j] === 'R/G') {
				currentManaCost.push(
					<li key={j} className="cardColorDot RorG" alt="R/G" />
				);
			} else if (manaCost[j] === 'W/B') {
				currentManaCost.push(
					<li key={j} className="cardColorDot WorB" alt="W/B" />
				);
			} else if (manaCost[j] === 'U/B') {
				currentManaCost.push(
					<li key={j} className="cardColorDot UorB" alt="U/B" />
				);
			} else if (manaCost[j] === 'U/R') {
				currentManaCost.push(
					<li key={j} className="cardColorDot UorR" alt="U/R" />
				);
			} else if (manaCost[j] === 'W/U') {
				currentManaCost.push(
					<li key={j} className="cardColorDot WorU" alt="W/U" />
				);
			} else if (manaCost[j] === 'R/P') {
				currentManaCost.push(
					<li key={j} className="cardColorDot RP" alt="R/P" />
				);
			} else if (manaCost[j] === 'B/P') {
				currentManaCost.push(
					<li key={j} className="cardColorDot BP" alt="B/P" />
				);
			} else if (manaCost[j] === 'G/P') {
				currentManaCost.push(
					<li key={j} className="cardColorDot GP" alt="G/P" />
				);
			} else if (manaCost[j] === 'W/P') {
				currentManaCost.push(
					<li key={j} className="cardColorDot WP" alt="W/P" />
				);
			} else if (manaCost[j] === 'U/P') {
				currentManaCost.push(
					<li key={j} className="cardColorDot UP" alt="U/P" />
				);
			}
		}
	}

	const colorClass = colorDisp ? 'manaContainer' : 'hidden';

	const quantClass = quantityDisp ? 'quantContainer' : 'hidden';

	return (
		<div className="cardContainer">
			<div className="cardInfo">
				<div
					className="cardArtContainer"
					onMouseMove={(e) => handleMouseMove(e)}
					onMouseEnter={() => {
						if (colorDisp) {
							manaContainer.current.classList.add('hidden');
						}
						settings.current.classList.remove('hidden');
						cardImage.current.classList.remove('hidden');
					}}
					onMouseLeave={() => {
						cardImage.current.classList.add('hidden');
						settings.current.classList.add('hidden');
						if (colorDisp) {
							manaContainer.current.classList.remove('hidden');
						}
					}}
				>
					{cardArt}
					{colorDisp ? (
						<div ref={manaContainer} className={colorClass}>
							{currentManaCost}
						</div>
					) : null}
					<div
						ref={settings}
						className="settings hidden"
						onClick={() => console.log('Hi')}
					>
						<div className="center"></div>
						<div className="tooth"></div>
						<div className="tooth"></div>
						<div className="tooth"></div>
						<div className="tooth"></div>
						<div className="tooth"></div>
						<div className="tooth"></div>
					</div>
					{quantityDisp ? (
						<div
							className={quantClass}
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
					) : null}
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
	colorDisp: PropTypes.bool.isRequired,
	quantityDisp: PropTypes.bool.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	colorDisp: state.tools.colorDisp,
	quantityDisp: state.tools.quantityDisp,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
	incrementCard,
	decrementCard,
	changeImage,
})(Card);
