import React from 'react';
import AnimateHeight from 'react-animate-height';

const DeckColors = ({ colors, deckId, showColors }) => {
	var count = 0;
	var colorTotal = 0;
	var class1 = 'deckColorDot';
	var class2 = 'deckColorDot';
	var class3 = 'deckColorDot';
	var class4 = 'deckColorDot';
	var class5 = 'deckColorDot';

	var columnClass1 = 'hidden';
	var columnClass2 = 'hidden';
	var columnClass3 = 'hidden';
	var columnClass4 = 'hidden';
	var columnClass5 = 'hidden';

	var height1 = 0;
	var height2 = 0;
	var height3 = 0;
	var height4 = 0;
	var height5 = 0;

	for (const color in colors) {
		if (colors[color] > colorTotal) {
			colorTotal = colors[color];
		}
		switch (count) {
			case 0:
				if (colors[color] > 0) {
					count++;
					class1 = 'deckColorDot '.concat(color);
					columnClass1 = 'colorColumn column'
						.concat(color)
						.concat(` ${deckId}`);
					height1 = colors[color];
				}
				break;
			case 1:
				if (colors[color] > 0) {
					count++;
					class2 = 'deckColorDot '.concat(color);
					columnClass2 = 'colorColumn column'
						.concat(color)
						.concat(` ${deckId}`);
					height2 = colors[color];
				}
				break;
			case 2:
				if (colors[color] > 0) {
					count++;
					class3 = 'deckColorDot '.concat(color);
					columnClass3 = 'colorColumn column'
						.concat(color)
						.concat(` ${deckId}`);
					height3 = colors[color];
				}
				break;
			case 3:
				if (colors[color] > 0) {
					count++;
					class4 = 'deckColorDot '.concat(color);
					columnClass4 = 'colorColumn column'
						.concat(color)
						.concat(` ${deckId}`);
					height4 = colors[color];
				}
				break;
			case 4:
				if (colors[color] > 0) {
					count++;
					class5 = 'deckColorDot '.concat(color);
					columnClass5 = 'colorColumn column'
						.concat(color)
						.concat(` ${deckId}`);
					height5 = colors[color];
				}
				break;
			default:
				break;
		}
	}

	return (
		<div>
			<ul className="colorContainer">
				<li className={class1}></li>
				<li className={class2}></li>
				<li className={class3}></li>
				<li className={class4}></li>
				<li className={class5}></li>
			</ul>
			<ul className="colorColumnContainer">
				<AnimateHeight
					height={showColors ? `${(height1 / colorTotal) * 100}%` : 0}
					duration={300}
				>
					<li className={columnClass1}></li>
				</AnimateHeight>
				<AnimateHeight
					height={showColors ? `${(height2 / colorTotal) * 100}%` : 0}
					duration={300}
				>
					<li className={columnClass2}></li>
				</AnimateHeight>
				<AnimateHeight
					height={showColors ? `${(height3 / colorTotal) * 100}%` : 0}
					duration={300}
				>
					<li className={columnClass3}></li>
				</AnimateHeight>
				<AnimateHeight
					height={showColors ? `${(height4 / colorTotal) * 100}%` : 0}
					duration={300}
				>
					<li className={columnClass4}></li>
				</AnimateHeight>
				<AnimateHeight
					height={showColors ? `${(height5 / colorTotal) * 100}%` : 0}
					duration={300}
				>
					<li className={columnClass5}></li>
				</AnimateHeight>
			</ul>
		</div>
	);
};

export default DeckColors;
