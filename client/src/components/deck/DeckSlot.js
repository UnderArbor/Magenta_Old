import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeckColors from './DeckColors';

import { openDeck, closeDeck } from '../../actions/deck';
import { closeTools } from '../../actions/tools';

const DeckSlot = ({
	id,
	deckId,
	types,
	openDeck,
	closeDeck,
	closeTools,
	globalDeckImage,
	globalDeckName,
	func,
}) => {
	const [deckName, setDeckName] = useState('loading...');

	const [deckImage, setDeckImage] = useState(
		'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
	);

	const [deckColors, setDeckColors] = useState([]);

	const [pulled, setPulled] = useState(0);

	const [showColors, setShowColors] = useState(false);

	useEffect(() => {
		if (id === deckId) {
			var colors = { red: 0, blue: 0, green: 0, black: 0, white: 0 };
			for (var i = 0; i < types.length; ++i) {
				for (var j = 0; j < types[i].cards.length; ++j) {
					for (var k = 0; k < types[i].cards[j].colors.length; ++k) {
						const newColor = types[i].cards[j].colors[k];
						switch (newColor) {
							case 'R':
								colors.red = colors.red + 1 * types[i].cards[j].quantity;
								break;
							case 'U':
								colors.blue = colors.blue + 1 * types[i].cards[j].quantity;
								break;
							case 'G':
								colors.green = colors.green + 1 * types[i].cards[j].quantity;
								break;
							case 'W':
								colors.white = colors.white + 1 * types[i].cards[j].quantity;
								break;
							case 'B':
								colors.black = colors.black + 1 * types[i].cards[j].quantity;
								break;
							default:
								break;
						}
					}
				}
			}
			setDeckColors(colors);
		}
	}, [types, id, deckId]);

	const getInfo = async () => {
		try {
			await axios.get(`/api/deck/${id}`).then((res) => {
				setDeckName(res.data.name);
				if (res.data.picture) {
					setDeckImage(res.data.picture);
				}

				if (pulled === 0) {
					setPulled(1);
					setDeckColors(res.data.colors);
				}
			});
		} catch (error) {
			console.log('Deck not found');
		}
	};

	var slotFormat;
	if (id !== deckId) {
		slotFormat = 'deckSlot';
		getInfo();
	} else {
		if (func === 'Nothing') {
			slotFormat = 'deckSlot featuredDeck';
		} else {
			slotFormat = 'deckSlot selectedDeck';
		}
		if (deckName !== globalDeckName) {
			setDeckName(globalDeckName);
		}
		if (deckImage !== globalDeckImage) {
			setDeckImage(globalDeckImage);
		}
	}

	return (
		<div className={slotFormat}>
			<div
				className="deckContainer"
				onMouseOver={() => {
					setShowColors(true);
				}}
				onMouseLeave={() => {
					setShowColors(false);
				}}
			>
				<input
					type="image"
					className="deckButton"
					data-id={id}
					src={deckImage}
					alt="made an oopsie"
					onClick={() => {
						if (id === deckId && func !== 'Nothing') {
							closeDeck();
						} else if (func !== 'Nothing') {
							openDeck(id, null);
							func();
						} else if (func === 'Nothing') {
							closeTools();
						}
					}}
				/>
				{func !== 'Nothing' ? (
					<p className="slotNameDisplay">{deckName}</p>
				) : null}
				<DeckColors
					colors={deckColors}
					deckId={'a'.concat(id)}
					showColors={showColors}
				/>
			</div>
		</div>
	);
};

DeckSlot.propTypes = {
	openDeck: PropTypes.func.isRequired,
	closeDeck: PropTypes.func.isRequired,
	closeTools: PropTypes.func.isRequired,
	types: PropTypes.array,
	deckId: PropTypes.string,
	globalDeckImage: PropTypes.string,
	globalDeckName: PropTypes.string,
};

const mapStateToProps = (state) => ({
	types: state.deck.types,
	deckId: state.deck.deckId,
	globalDeckImage: state.deck.deckImage,
	globalDeckName: state.deck.deckName,
});

export default connect(mapStateToProps, { openDeck, closeDeck, closeTools })(
	DeckSlot
);
