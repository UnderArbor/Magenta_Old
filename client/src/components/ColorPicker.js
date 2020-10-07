import React, { useState } from 'react';

export const ColorPicker = ({ title, color, cssVar }) => {
	const [choosingColor, setChoosingColor] = useState(false);
	const [currentColor, setCurrentColor] = useState(color);

	function changeColor(event) {
		if (event.keyCode === 13) {
			if (event.target.value !== '') {
				const newColor = event.target.value;
				document.documentElement.style.setProperty(cssVar, newColor);
				setCurrentColor(newColor);
			}
			setChoosingColor(false);
		}
	}

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<div
				className="color"
				style={{ color: currentColor }}
				onClick={() => setChoosingColor(!choosingColor)}
			>
				{title}
			</div>
			{choosingColor ? (
				<input
					style={{ width: '50%', float: 'right', margin: '0 -36px' }}
					placeholder={currentColor}
					onKeyDown={changeColor}
				></input>
			) : null}
		</div>
	);
};

export default ColorPicker;
