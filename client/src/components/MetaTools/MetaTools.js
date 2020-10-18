import React from 'react';
import ManaCurve from './ManaCurve';

const MetaTools = (props) => {
	return (
		<div className="metaTools">
			<div className="metaHeader">Tools</div>
			<div className="manaCurve">
				<ManaCurve />
			</div>
		</div>
	);
};

export default MetaTools;
