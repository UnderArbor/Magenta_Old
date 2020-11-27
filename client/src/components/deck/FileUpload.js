import React from 'react';

import getCardInfo from '../../utils/functions/getCardInfo';

const FileUpload = ({ importDeck, isAuthenticated, openDeck }) => {
	let fileReader;

	const handleFileRead = async (e) => {
		const content = fileReader.result.split('\n');
		var types = [
			{ name: 'Creature', open: true, cards: [] },
			{ name: 'Enchantment', open: true, cards: [] },
			{ name: 'Artifact', open: true, cards: [] },
			{ name: 'Planeswalker', open: true, cards: [] },
			{ name: 'Instant', open: true, cards: [] },
			{ name: 'Sorcery', open: true, cards: [] },
			{ name: 'Land', open: true, cards: [] },
			{ name: 'Hero', open: true, cards: [] },
			{ name: 'Vanguard', open: true, cards: [] },
			{ name: 'Conspiracy', open: true, cards: [] },
			{ name: 'Scheme', open: true, cards: [] },
			{ name: 'Plane', open: true, cards: [] },
			{ name: 'Phenomenon', open: true, cards: [] },
		];
		for (var i = 0; i < content.length; ++i) {
			if (content[i] === '') {
				break;
			}

			const card = content[i].split(/(?<=^\S+)\s/);
			const cardInfo = await getCardInfo(card[1], card[0]);
			if ((await cardInfo) !== null) {
				for (var j = 0; j < types.length; ++j) {
					if (cardInfo.mainType === types[j].name) {
						types[j].cards.unshift(cardInfo);
						console.log('Progress: ', i, '/', content.length);
						break;
					}
				}
			} else {
				break;
			}
		}

		if (isAuthenticated) {
			importDeck(
				types,
				document
					.getElementById('file')
					.files[0].name.toString()
					.substr(
						0,
						document.getElementById('file').files[0].name.lastIndexOf('.')
					)
					.replace(/-/g, ' ')
			);
		} else {
			openDeck(-2, types);
		}
	};

	const handleFileChosen = (file) => {
		fileReader = new FileReader();
		fileReader.onloadend = handleFileRead;
		fileReader.readAsText(file);
	};

	return (
		<div className="upload-expense">
			<input
				type="file"
				id="file"
				className="input-file"
				accept=".txt"
				onChange={(e) => handleFileChosen(e.target.files[0])}
			/>
		</div>
	);
};

export default FileUpload;
