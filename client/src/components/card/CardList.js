import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TypeArea from './TypeArea';

import cardTypes from '../../utils/json/cardTypes.json';

export const CardList = ({ cards, columnCount }) => {
	if (cards.length > 0) {
		var cardAreaName = 'cardArea2';
		var indexBuffer = 0;
		var cardStorage = cards.map((card) => ({ ...card }));

		cardStorage = cardStorage.sort(function (a, b) {
			return a.name > b.name ? 1 : -1;
		});

		if (columnCount === 1) {
			cardAreaName = 'cardArea1';
		} else if (columnCount === 2) {
			cardAreaName = 'cardArea2';
		} else if (columnCount === 3) {
			cardAreaName = 'cardArea3';
		}

		return (
			<div
				// className="cardArea2"
				className={cardAreaName}
				style={{
					padding: '8px',
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

	return null;
};

CardList.propTypes = {
	cards: PropTypes.array,
	columnCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
	cards: state.deck.cards,
	columnCount: state.tools.columnCount,
});

export default connect(mapStateToProps)(CardList);
