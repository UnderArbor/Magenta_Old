import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	columnChange,
	showColors,
	hideColors,
	showQuantity,
	hideQuantity,
} from '../../actions/tools';

const ColumnButtons = ({
	columnCount,
	colorDisp,
	quantityDisp,
	columnChange,
	showColors,
	hideColors,
	showQuantity,
	hideQuantity,
}) => {
	return (
		<div className="columnContainer">
			<h3
				style={{
					display: 'inline-block',
					margin: '16px 0',
				}}
			>
				Columns:
			</h3>
			<button
				className={
					columnCount === 1 ? 'columnButton activeColumnButton' : 'columnButton'
				}
				onClick={() => columnChange(1)}
			>
				1
			</button>
			<button
				className={
					columnCount === 2 ? 'columnButton activeColumnButton' : 'columnButton'
				}
				onClick={() => columnChange(2)}
			>
				2
			</button>
			<button
				className={
					columnCount === 3 ? 'columnButton activeColumnButton' : 'columnButton'
				}
				onClick={() => columnChange(3)}
			>
				3
			</button>
			{/* {colorDisp ? (
				<button onClick={() => hideColors()}>Check</button>
			) : (
				<button onClick={() => showColors()}>Uncheck</button>
			)}
			{quantityDisp ? (
				<button onClick={() => hideQuantity()}>Check</button>
			) : (
				<button onClick={() => showQuantity()}>Uncheck</button>
			)} */}
		</div>
	);
};

ColumnButtons.propTypes = {
	columnCount: PropTypes.number,
	colorDisp: PropTypes.bool.isRequired,
	quantityDisp: PropTypes.bool.isRequired,
	columnChange: PropTypes.func.isRequired,
	showColors: PropTypes.func.isRequired,
	hideColors: PropTypes.func.isRequired,
	showQuantity: PropTypes.func.isRequired,
	hideQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	columnCount: state.tools.columnCount,
	colorDisp: state.tools.colorDisp,
	quantityDisp: state.tools.quantityDisp,
});

export default connect(mapStateToProps, {
	columnChange,
	showColors,
	hideColors,
	showQuantity,
	hideQuantity,
})(ColumnButtons);
