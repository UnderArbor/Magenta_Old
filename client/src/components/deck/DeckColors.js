import React from 'react';

const DeckColors = ({ colors }) => {
	var class1 = 'deckColorDot';
	var class2 = 'deckColorDot';
	var class3 = 'deckColorDot';
	var class4 = 'deckColorDot';
	var class5 = 'deckColorDot';

	for (var i = 0; i < colors.length; ++i) {
		switch (i) {
			case 0:
				class1 = 'deckColorDot '.concat(colors[i]);
				break;
			case 1:
				class2 = 'deckColorDot '.concat(colors[i]);
				break;
			case 2:
				class3 = 'deckColorDot '.concat(colors[i]);
				break;
			case 3:
				class4 = 'deckColorDot '.concat(colors[i]);
				break;
			case 4:
				class5 = 'deckColorDot '.concat(colors[i]);
				break;
			default:
				break;
		}
	}

	return (
		<ul className="colorContainer">
			<li className={class1}></li>
			<li className={class2}></li>
			<li className={class3}></li>
			<li className={class4}></li>
			<li className={class5}></li>
		</ul>
	);
};

export default DeckColors;
