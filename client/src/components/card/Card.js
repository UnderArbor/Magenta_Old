import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	incrementCard,
	decrementCard,
	changeImage,
	moveCard,
} from '../../actions/deck';
import CardArt from './CardArt';
import Settings from './Settings';

import settingsIcon from '../../utils/images/Settings_Cog.png';

import axios from 'axios';

export const Card = ({
	card,
	index,
	typeIndex,
	typeName,
	name,
	set,
	quantity,
	manaCost,
	src,
	src2,
	incrementCard,
	decrementCard,
	changeImage,
	moveCard,
	deckId,
	colorDisp,
	quantityDisp,
	isAuthenticated,
}) => {
	const cardImage = useRef(null);
	const manaContainer = useRef(null);
	const settings = useRef(null);
	const settingsIconRef = useRef(null);

	const [ghostCoords, setGhostCoords] = useState({
		leftCoord: 0,
		topCoord: 0,
		flippedY: false,
		flippedX: false,
	});

	const [settingInfo, setSettings] = useState({
		openSettings: false,
	});

	const { leftCoord, topCoord, flippedY, flippedX } = ghostCoords;

	const { openSettings } = settingInfo;

	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	var dragIndex = -1;

	const handleMouseMove = (e) => {
		const windowHeight =
			window.innerHeight || document.documentElement.clientHeight;

		const windowWidth =
			window.innerWidth || document.documentElement.clientWidth;

		const image = document.getElementsByClassName('cardImage');
		const bounding = image[index].getBoundingClientRect();

		if (bounding.height > 0) {
			var p = {};
			var obj = e.target;
			p.x = obj.offsetLeft;
			p.y = obj.offsetTop;
			while (obj.offsetParent) {
				p.x = p.x + obj.offsetParent.offsetLeft;
				p.y = p.y + obj.offsetParent.offsetTop;
				if (obj === document.getElementsByTagName('body')[0]) {
					break;
				} else {
					obj = obj.offsetParent;
				}
			}

			p.x = p.x + e.target.offsetWidth + 8;

			p.y = p.y - 3;

			//Flip vertically and horizontally
			if (
				(bounding.bottom > windowHeight ||
					(flippedY === true &&
						bounding.bottom + bounding.height > windowHeight)) &&
				(bounding.right > windowWidth ||
					(flippedX === true &&
						bounding.right + bounding.width + e.target.width > windowWidth))
			) {
				setGhostCoords({
					leftCoord: p.x - e.target.width - bounding.width - 11,
					topCoord: p.y - bounding.height + 116,
					flippedY: true,
					flippedX: true,
				});

				//Flip vertically
			} else if (
				bounding.bottom > windowHeight ||
				(flippedY === true && bounding.bottom + bounding.height > windowHeight)
			) {
				setGhostCoords({
					leftCoord: p.x,
					topCoord: p.y - bounding.height + 116,
					flippedY: true,
					flippedX: false,
				});

				//Flip horizontally
			} else if (
				bounding.right > windowWidth ||
				(flippedX === true &&
					bounding.right + bounding.width + e.target.width > windowWidth)
			) {
				setGhostCoords({
					leftCoord: p.x - e.target.width - bounding.width - 11,
					topCoord: p.y,
					flippedY: false,
					flippedX: true,
				});

				//Standard orientation
			} else {
				setGhostCoords({
					leftCoord: p.x,
					topCoord: p.y,
					flippedY: false,
					flippedX: false,
				});
			}
		}
	};

	function handleDragStart(e) {
		e.stopImmediatePropagation();

		let cardImages = document.querySelectorAll('.cardImage');
		cardImages.forEach(function (item) {
			item.classList.add('superhidden');
		});

		const cardDragName = this.dataset.name;

		let cardDropZones = document.querySelectorAll('.cardDropZone');
		cardDropZones.forEach(function (item) {
			if (item.dataset.type === e.target.dataset.typename) {
				if (
					Number(item.dataset.index) !== Number(e.target.dataset.index) &&
					Number(item.dataset.index) !== Number(e.target.dataset.index) + 1
				) {
					item.classList.add('acceptDrop');
					item.innerHTML = `${cardDragName}`;
				}
			} else {
				item.classList.add('acceptDrop');
				item.innerHTML = `${cardDragName}`;
			}
		});

		let cardArts = document.querySelectorAll('.cardArt');
		for (var i = 0; i < cardArts.length; ++i) {
			if (cardArts[i].dataset.name === this.dataset.name) {
				e.dataTransfer.setDragImage(cardArts[i], 54, 60);
				e.dataTransfer.setData('text/plain', cardArts[i].src);
				break;
			}
		}
		var cardInfo = document.getElementsByClassName('cardInfo');
		for (var j = 0; j < cardInfo.length; ++j) {
			if (
				cardInfo[j].childNodes[1].childNodes[0].innerHTML !== this.dataset.name
			) {
				cardInfo[j].style.opacity = '.4';
			}
		}

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('type', 'card');
	}

	function handleDragEnd(e) {
		e.stopImmediatePropagation();
		e.target.classList.remove('settingsHover');
		e.target.childNodes[0].classList.remove('settingsIconHover');
		let cardDropZones = document.querySelectorAll('.cardDropZone');
		cardDropZones.forEach(function (item) {
			item.classList.remove('acceptDrop');
			item.classList.remove('extendedRightZone');
			item.classList.remove('extendedLeftZone');
		});

		let cardImages = document.querySelectorAll('.cardImage');
		cardImages.forEach(function (item) {
			item.classList.remove('superhidden');
		});
		var cardInfo = document.getElementsByClassName('cardInfo');
		for (var i = 0; i < cardInfo.length; ++i) {
			cardInfo[i].style.opacity = '1';
		}
		// console.log('DRAGEND');
	}

	function handleDragEnter(e) {
		e.stopImmediatePropagation();
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
		e.stopImmediatePropagation();
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
		e.dataTransfer.clearData();
		return false;
	}

	let targetArt = document.querySelectorAll('.settings');
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

	function handleDragEnter2(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();

		if (e.target.classList.contains('acceptDrop')) {
			const newIndex = this.dataset.index;
			const newType = this.dataset.type;

			moveCard(e.target.innerHTML, newIndex, newType);
			let cardDropZones = document.querySelectorAll('.cardDropZone');
			cardDropZones.forEach(function (item) {
				if (item.dataset.type === e.target.dataset.typename) {
					if (
						Number(item.dataset.index) !== Number(e.target.dataset.index) &&
						Number(item.dataset.index) !== Number(e.target.dataset.index) + 1
					) {
						item.classList.add('acceptDrop');
					} else {
						item.classList.remove('acceptDrop');
					}
				} else {
					item.classList.add('acceptDrop');
				}
			});
			var cardInfo = document.getElementsByClassName('cardInfo');
			for (var j = 0; j < cardInfo.length; ++j) {
				if (
					cardInfo[j].childNodes[1].childNodes[0].innerHTML !==
					e.target.innerHTML
				) {
					console.log(
						'firstname: ',
						cardInfo[j].childNodes[1].childNodes[0].innerHTML
					);
					console.log('secondname: ', e.target.innerHTML);
					cardInfo[j].style.opacity = '.4';
				}
			}
		}
	}

	function handleDragOver2(e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';

		return false;
	}

	function handleDragLeave2(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();

		return false;
	}

	function handleDrop2(e) {
		e.stopImmediatePropagation();
		e.preventDefault();

		return false;
	}

	let cardDropZones = document.querySelectorAll('.cardDropZone');
	cardDropZones.forEach(function (item) {
		item.addEventListener('dragenter', handleDragEnter2, false);
		item.addEventListener('dragover', handleDragOver2, false);
		item.addEventListener('dragleave', handleDragLeave2, false);
		item.addEventListener('drop', handleDrop2, false);
	});

	const cardArt = [];

	for (var i = 0; i < quantity; ++i) {
		if (i === 0) {
			cardArt.push(
				<CardArt
					key={i}
					name={name}
					src={src}
					offset={i}
					zIndex={4}
					position={'relative'}
					vOffset={i}
					className={'cardArt'}
					typeIndex={typeIndex}
					typeName={typeName}
				/>
			);
		} else if (i < 4) {
			cardArt.push(
				<CardArt
					key={i}
					name={name}
					src={src}
					offset={`${i * 4}px`}
					zIndex={`${4 - i}`}
					position={'absolute'}
					vOffset={`${i * -2}px`}
					className={'cardArt'}
					typeIndex={typeIndex}
					typeName={typeName}
				/>
			);
		} else {
			cardArt.push(
				<CardArt
					key={i}
					name={name}
					src={src}
					offset={`${i * 4 + 2}px`}
					zIndex={`${4 - i}`}
					position={'absolute'}
					vOffset={`${i * -2 + 2}px`}
					className={'cardArt moreCards'}
					typeIndex={typeIndex}
					typeName={typeName}
				/>
			);
			break;
		}
	}

	const currentManaCost = [];

	for (var j = 0; j < manaCost.length; ++j) {
		if (!manaCost[j].includes('/')) {
			if (manaCost[j] === 'W') {
				currentManaCost.push(
					<li key={j} className="cardColorDot white" alt="W" />
				);
			} else if (manaCost[j] === 'U') {
				currentManaCost.push(
					<li key={j} className="cardColorDot blue" alt="U" />
				);
			} else if (manaCost[j] === 'B') {
				currentManaCost.push(
					<li key={j} className="cardColorDot black" alt="B" />
				);
			} else if (manaCost[j] === 'G') {
				currentManaCost.push(
					<li key={j} className="cardColorDot green" alt="G" />
				);
			} else if (manaCost[j] === 'R') {
				currentManaCost.push(
					<li key={j} className="cardColorDot red" alt="R" />
				);
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
					onMouseEnter={() => {
						cardImage.current.classList.remove('hidden');
						settings.current.classList.add('settingsHover');
						settingsIconRef.current.classList.add('settingsIconHover');
					}}
					onMouseLeave={() => {
						cardImage.current.classList.add('hidden');
						if (!openSettings) {
							settings.current.classList.remove('settingsHover');
							settingsIconRef.current.classList.remove('settingsIconHover');
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
						data-name={name}
						data-index={typeIndex}
						data-typename={typeName}
						className="settings"
						// draggable="true"
						onMouseMove={(e) => handleMouseMove(e)}
						onClick={async (e) => {
							if (!openSettings) {
								var cardImages = document.getElementsByClassName('cardInfo');
								for (var i = 0; i < cardImages.length; ++i) {
									if (
										name ===
										cardImages[i].childNodes[0].childNodes[
											cardImages[i].childNodes[0].childNodes.length - 1
										].childNodes[0].innerHTML
									) {
										cardImages[i].childNodes[0].classList.add('noHover');
									} else {
										cardImages[i].classList.add('noHover');
									}
									if (
										cardImages[i].childNodes[1].childNodes[0].innerHTML !== name
									) {
										cardImages[i].style.opacity = '.4';
									}
								}
								var typeHeaders = document.getElementsByClassName('typeHeader');
								for (var j = 0; j < typeHeaders.length; ++j) {
									typeHeaders[j].classList.add('noHover');
									typeHeaders[j].style.opacity = '.4';
								}
								setSettings({
									openSettings: !openSettings,
								});
								settings.current.classList.remove('hidden');
							}
						}}
					>
						<img
							ref={settingsIconRef}
							className="settingsIcon"
							src={settingsIcon}
							alt="set"
						/>
					</div>
					{quantityDisp ? (
						<div className={quantClass}>
							<div className="arrowContainer">
								<button
									className="arrow down"
									onClick={async () => {
										decrementCard(name);
										if (isAuthenticated) {
											await axios.delete(
												`/api/deck/types/card/${deckId}/${card._id}`
											);
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
											const body = await JSON.stringify({ card });
											await axios.put(
												`/api/deck/types/card/${deckId}`,
												body,
												config
											);
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
					style={{
						left: leftCoord + 'px',
						top: topCoord + 'px',
						width: '350px',
					}}
					src={src2}
					alt="Doopsie"
				></img>
			</div>
			{openSettings ? (
				<Settings
					name={name}
					set={set}
					setSettings={setSettings}
					settingX={flippedX ? leftCoord - 14 : leftCoord}
					settingY={topCoord}
					cardImageRef={cardImage}
					manaContainer={manaContainer}
					colorDisp={colorDisp}
					settingsRef={settings}
					settingsIconRef={settingsIconRef}
				/>
			) : null}
		</div>
	);
};

Card.propTypes = {
	incrementCard: PropTypes.func.isRequired,
	decrementCard: PropTypes.func.isRequired,
	changeImage: PropTypes.func.isRequired,
	moveCard: PropTypes.func.isRequired,
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
	moveCard,
})(Card);
