import React from 'react';

const DeckColors = ({ colors }) => {
	var class1 = 'colorDot';
	var class2 = 'colorDot';
	var class3 = 'colorDot';
	var class4 = 'colorDot';
	var class5 = 'colorDot';

	for (var i = 0; i < colors.length; ++i) {
		switch (i) {
			case 0:
				class1 = 'colorDot '.concat(colors[i]);
				break;
			case 1:
				class2 = 'colorDot '.concat(colors[i]);
				break;
			case 2:
				class3 = 'colorDot '.concat(colors[i]);
				break;
			case 3:
				class4 = 'colorDot '.concat(colors[i]);
				break;
			case 4:
				class5 = 'colorDot '.concat(colors[i]);
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
