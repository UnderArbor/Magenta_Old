import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TypeArea from './TypeArea';
import TypeHeader from './TypeHeader';

export const CardList = ({ types, columnCount }) => {
	var cardAreaName = 'cardArea2';
	var indexBuffer = 0;
	var index = 0;

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
			{types.map((type) => {
				index++;
				if (type.cards.length > 0 && type.open) {
					indexBuffer += type.cards.length;
					return (
						<TypeArea
							key={type.name.concat('open')}
							type={type}
							cards={type.cards}
							indexBuffer={indexBuffer - type.cards.length}
							index={index - 1}
							open={type.open}
						/>
					);
				} else if (type.cards.length > 0 && !type.open) {
					return (
						<div
							key={type.name.concat('div')}
							className="typeArea"
							style={{ width: '100%', float: 'left' }}
						>
							<TypeHeader type={type} key={type.name.concat('closed')} />
							<hr
								key={type.name.concat('hr')}
								style={{ marginBottom: '16px' }}
								className="normal"
							/>
							<div className="dropZone" data-id={index - 1}></div>
						</div>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};

CardList.propTypes = {
	types: PropTypes.array,
	columnCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
	types: state.deck.types,
	columnCount: state.tools.columnCount,
});

export default connect(mapStateToProps)(CardList);
