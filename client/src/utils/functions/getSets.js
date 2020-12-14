import fetch from 'node-fetch';

const SCRYFALL_API = 'https://api.scryfall.com';

const getSets = async (name) => {
	let sets = [];

	let setIndex = 0;
	try {
		await fetch(`${SCRYFALL_API}/cards/named?exact=${name}`)
			.then((response) => {
				return response.json();
			})
			.then(async (json) => {
				//Get set/image info
				await fetch(json.prints_search_uri)
					.then((response2) => {
						return response2.json();
					})
					.then(async (json2) => {
						var currentPage = json2;
						for (var i = 0; i < Number(json2.total_cards); ++i) {
							var currentJSON;
							if (currentPage.data[i - Number(setIndex)] !== undefined) {
								currentJSON = currentPage.data[i - Number(setIndex)];
							} else {
								currentPage = await fetch(json2.next_page)
									.then((response3) => {
										return response3.json();
									})
									.then((json3) => {
										return json3;
									});
								currentJSON = currentPage.data[0];
								setIndex += Number(175);
							}

							//If double-faced, pick first face
							if (!currentJSON.image_uris) {
								currentJSON = currentJSON.card_faces[0];
							}

							//Populate set array
							sets.push({
								setName: currentJSON.set_name,
								cardArt: currentJSON.image_uris.art_crop,
								cardImage: currentJSON.image_uris.normal,
							});
						}
					});
			});
		return sets;
	} catch (err) {
		console.log('Error: ', err);
		return null;
	}
};

export default getSets;
