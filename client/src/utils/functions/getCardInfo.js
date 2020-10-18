import fetch from 'node-fetch';

const SCRYFALL_API = 'https://api.scryfall.com';

const getCardInfo = async (name) => {
	let imageURL = '';
	let cardImageURL = '';
	let cmc = '';
	let types = '';
	let colors = '';
	await fetch(`${SCRYFALL_API}/cards/named?exact=${name}`)
		.then((response) => response.json())
		.then((json) => {
			imageURL = json.image_uris.art_crop;
			cardImageURL = json.image_uris.normal;
			cmc = json.cmc;
			types = json.type_line.split('—');
			colors = json.colors;
		});

	if (!types[1]) {
		types[1] = '';
	}

	//Create new card
	const card = {
		name,
		quantity: 1,
		cardArt: imageURL,
		cardImage: cardImageURL,
		cmc,
		types: types[0].trim().split(' '),
		subtypes: types[1].trim().split(' '),
		colors,
	};

	return card;
};

export default getCardInfo;
