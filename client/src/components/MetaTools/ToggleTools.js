import React from 'react';
import Notification from '../util-component/Notification';

const ToggleTools = ({ toggleTool, character, openTools }) => {
	var corners = '0';
	if (character === 62) {
		corners = '10%';
	}

	return (
		<div style={{ position: 'relative' }}>
			<button
				onClick={() => toggleTool()}
				style={{
					display: 'inline-block',
					position: 'relative',
					width: '48px',
					border: 'none',
					height: '47px',
					backgroundColor: 'gray',
					color: 'var(--secondary-color)',
					fontSize: '22px',
					margin: '1px',
					borderTopRightRadius: `${corners}`,
					borderBottomRightRadius: `${corners}`,
				}}
			>
				{String.fromCharCode(character)}
			</button>
			{openTools ? null : <Notification />}
		</div>
	);
};

export default ToggleTools;
