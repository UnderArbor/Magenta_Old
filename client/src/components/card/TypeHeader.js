import React from 'react';
import PropTypes from 'prop-types';

const TypeHeader = ({ type }) => {
	return (
		<div className="typeHeader">
			<p className="typeName">{type}</p>
			<button className="toggleArea">Up</button>
		</div>
	);
};

TypeHeader.propTypes = {};

export default TypeHeader;
