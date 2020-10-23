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

	return null;
};

CardList.propTypes = {
	cards: PropTypes.array,
};

const mapStateToProps = (state) => ({
	cards: state.deck.cards,
});

export default connect(mapStateToProps)(CardList);
