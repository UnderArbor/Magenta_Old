const fs = require('fs');
const fetch = require('node-fetch');

const SCRYFALL_API = 'https://api.scryfall.com';

const jsonNames = async () => {
	var names = [];

	await fetch(`${SCRYFALL_API}/catalog/card-names`)
		.then((response) => response.json())
		.then((response) => response.data.map((name) => names.push(name)))
		.catch((error) => {
			return;
		});

	console.log('Names length: ', names.length);

	var namesString = JSON.stringify(names);

	console.log('Names String: ', namesString);
	fs.writeFile('names.txt', namesString, function (err, result) {
		if (err) console.log('error', err);
	});

	console.log('File written!');
};

jsonNames();
