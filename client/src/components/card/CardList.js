import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TypeArea from './TypeArea';

import { moveTypes, moveCards } from '../../actions/deck';

export const CardList = ({ types, columnCount, moveTypes, moveCards }) => {
	var cardAreaName = 'cardArea2';
	var indexBuffer = 0;
	if (columnCount === 1) {
		cardAreaName = 'cardArea1';
	} else if (columnCount === 2) {
		cardAreaName = 'cardArea2';
	} else if (columnCount === 3) {
		cardAreaName = 'cardArea3';
	}

	return (
		<div
			className={cardAreaName}
			style={{
				padding: '8px',
			}}
		>
			<ReactSortable
				list={types}
				setList={moveTypes}
				ghostClass={'ghost'}
				animation={1000}
				easing={'cubic-bezier(0.16, 1, 0.3, 1)'}
			>
				{types.map((type, index) => {
					indexBuffer += type.cards.length;
					return (
						<TypeArea
							key={type.name.concat('open')}
							type={type}
							cards={type.cards}
							indexBuffer={indexBuffer - type.cards.length}
							index={Number(index)}
							open={type.open}
							moveCards={moveCards}
						/>
					);
				})}
			</ReactSortable>
		</div>
	);
};

CardList.propTypes = {
	types: PropTypes.array,
	columnCount: PropTypes.number.isRequired,
	moveTypes: PropTypes.func.isRequired,
	moveCards: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	types: state.deck.types,
	columnCount: state.tools.columnCount,
});

export default connect(mapStateToProps, { moveTypes, moveCards })(CardList);
