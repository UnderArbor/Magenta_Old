import React from 'react';
import PropTypes from 'prop-types';

const DeckNameDisplay = ({ deckName, tempName, setTempName, keyPress }) => {
	return (
		<div
			className="deckNamedDisplay"
			style={{
				width: '100%',
				height: '48px',
				backgroundColor: 'var(--secondary-color)',
				borderTopRightRadius: '10px',
				borderTopLeftRadius: '10px',
			}}
		>
			<input
				className="deckNameField"
				placeholder={deckName}
				style={{
					boxSizing: 'border-box',
					width: '100%',
					padding: '3px',
					backgroundColor: 'var(--secondary-color)',
					border: '0px',
					color: 'black',
					fontSize: '36px',
					paddingLeft: '12px',
					borderTopRightRadius: '10px',
					borderTopLeftRadius: '10px',
				}}
				name="deckName"
				value={tempName}
				onChange={(e) => setTempName(e.target.value)}
				onKeyPress={(e) => keyPress(e)}
				required
			/>
		</div>
	);
};

DeckNameDisplay.propTypes = {};

export default DeckNameDisplay;