import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { columnChange } from '../../actions/tools';

const ColumnButtons = ({ columnCount, columnChange }) => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h3
				style={{
					display: 'inline-block',
					margin: '16px 0',
				}}
			>
				Column Count
			</h3>
			<div className="columnContainer">
				<button onClick={() => columnChange(1)}>1</button>
				<button onClick={() => columnChange(2)}>2</button>
				<button onClick={() => columnChange(3)}>3</button>
			</div>
		</div>
	);
};

ColumnButtons.propTypes = {
	columnCount: PropTypes.number,
	columnChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	columnCount: state.tools.columnCount,
});

export default connect(mapStateToProps, { columnChange })(ColumnButtons);
