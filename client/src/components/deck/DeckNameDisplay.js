import React from 'react';

const DeckNameDisplay = ({ deckName, tempName, setTempName, keyPress }) => {
	return (
		<div className="deckNameDisplay">
			<input
				onBlur={() => keyPress('blur')}
				className="deckNameField"
				placeholder={deckName}
				style={{
					boxSizing: 'border-box',
					width: '100%',
					padding: '3px',
					backgroundColor: 'var(--header-color)',
					border: '0px',
					color: 'white',
					fontSize: '36px',
					paddingLeft: '12px',
					borderTopRightRadius: '10px',
					borderTopLeftRadius: '10px',
				}}
				name="deckName"
				type="deckName"
				value={tempName}
				onChange={(e) => setTempName(e.target.value)}
				onKeyPress={(e) => keyPress(e)}
				required
			/>
		</div>
	);
};

export default DeckNameDisplay;
