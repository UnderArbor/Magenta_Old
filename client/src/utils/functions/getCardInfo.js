import fetch from 'node-fetch';

import cardTypes from '../json/cardTypes.json';

const SCRYFALL_API = 'https://api.scryfall.com';

const getCardInfo = async (name, quantity) => {
	if (!quantity) {
		quantity = 1;
	}
	let imageURL = '';
	let cardImageURL = '';
	let cmc = '';
	let manaCost = '';
	let types = ['', ''];
	let colors = '';
	let set = '';

	try {
		await fetch(`${SCRYFALL_API}/cards/named?exact=${name}`)
			.then((response) => {
				return response.json();
			})
			.then(async (json) => {
				//Get card info
				if (!json.image_uris) {
					json = json.card_faces[0];
				}
				set = json.set_name;
				imageURL = json.image_uris.art_crop;
				cardImageURL = json.image_uris.normal;
				cmc = json.cmc;
				manaCost = json.mana_cost;
				types = json.type_line.split('—');
				colors = json.colors;
			});
	} catch (err) {
		console.log('Error: ', err);
		return null;
	}

	if (!types[1]) {
		types[1] = '';
	}

	const mainTypeList = types[0].trim().split(' ');

	var mainType = '';

	for (var i = 0; i < cardTypes.length; ++i) {
		if (mainTypeList.includes(cardTypes[i])) {
			mainType = cardTypes[i];
			break;
		}
	}

	manaCost = manaCost.replace(/\{/g, '').replace(/\}/g, ',').split(',');

	manaCost.pop();

	//Create new card
	const card = {
		name: name.replace(/\s*$/, ''),
		quantity: quantity,
		setName: set,
		cardArt: imageURL,
		cardImage: cardImageURL,
		cmc,
		manaCost,
		mainType,
		types: mainTypeList,
		subtypes: types[1].trim().split(' '),
		colors,
	};

	return card;
};

export default getCardInfo;
