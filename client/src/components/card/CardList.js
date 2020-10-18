import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TypeArea from './TypeArea';

import cardTypes from '../../utils/json/cardTypes.json';

export const CardList = ({ cards }) => {
	if (cards.length > 0) {
		var indexBuffer = 0;
		var cardStorage = cards.map((card) => ({ ...card }));

		cardStorage = cardStorage.sort(function (a, b) {
			return a.name > b.name ? 1 : -1;
		});

		return (
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
					flexBasis: 'auto',
					alignContent: 'flex-start',
					alignItems: 'flex-start',
				}}
			>
				{cardTypes.map((type) => {
					var cardTypeArray = [];
					for (var i = 0; i < cardStorage.length; ++i) {
						if (cardStorage[i].types.includes(type)) {
							cardTypeArray.push(cardStorage[i]);
							cardStorage[i].types = [''];
						}
					}

					if (cardTypeArray.length > 0) {
						indexBuffer += cardTypeArray.length;
						return (
							<TypeArea
								key={type}
								type={type}
								cards={cardTypeArray}
								indexBuffer={indexBuffer - cardTypeArray.length}
							/>
						);
					} else {
						return null;
					}
				})}
			</div>
		);
	}

	// if (cards.length > 0) {
	// 	cards = cards.sort(function (a, b) {
	// 		return a.name > b.name ? 1 : -1;
	// 	});
	// 	var creatures = [];
	// 	cards.map((card) => {
	// 		if (card.types.includes('Creature')) {
	// 			creatures.unshift(card);
	// 		}
	// 	});

	// 	var planeswalkers = [];
	// 	cards.map((card) => {
	// 		if (card.types.includes('Planeswalker')) {
	// 			planeswalkers.unshift(card);
	// 		}
	// 	});

	// 	if (creatures.length > 0) {
	// 		return (
	// 			<div
	// 				style={{
	// 					margin: '16px',
	// 					width: '45%',
	// 				}}
	// 			>
	// 				<div
	// 					style={{
	// 						color: 'var(--secondary-color)',
	// 						fontSize: '24px',
	// 					}}
	// 				>
	// 					Creatures
	// 				</div>
	// 				<hr style={{ marginBottom: '16px' }} className="normal" />
	// 				{creatures.map((card, index) => (
	// 					<Card
	// 						key={card.name}
	// 						name={card.name}
	// 						index={index}
	// 						quantity={card.quantity}
	// 						src={card.cardArt}
	// 						src2={card.cardImage}
	// 					/>
	// 				))}
	// 			</div>
	// 		);
	// 	}

	// 	if (planeswalkers.length > 0) {
	// 		return (
	// 			<div
	// 				style={{
	// 					margin: '16px',
	// 					width: '45%',
	// 					float: 'left',
	// 				}}
	// 			>
	// 				<div
	// 					style={{
	// 						color: 'var(--secondary-color)',
	// 						fontSize: '24px',
	// 					}}
	// 				>
	// 					Planeswalkers
	// 				</div>
	// 				<hr style={{ marginBottom: '16px' }} className="normal" />
	// 				{planeswalkers.map((card, index) => (
	// 					<Card
	// 						key={card.name}
	// 						name={card.name}
	// 						index={index}
	// 						quantity={card.quantity}
	// 						src={card.cardArt}
	// 						src2={card.cardImage}
	// 					/>
	// 				))}
	// 			</div>
	// 		);
	// 	}
	// }

	return null;
};

CardList.propTypes = {
	cards: PropTypes.array,
};

const mapStateToProps = (state) => ({
	cards: state.deck.cards,
});

export default connect(mapStateToProps)(CardList);
