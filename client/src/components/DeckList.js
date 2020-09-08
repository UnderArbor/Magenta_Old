import React, { useState } from 'react';
import Deck from './Deck';

export const DeckList = () => {
	const [deckLoader, setDeckLoader] = useState(false);

	return (
		<div>
			<div className="deckList">
				<p className="ownerName">Your Decks</p>
				<hr />
				<button
					className="createDeckButton"
					onClick={() => setDeckLoader(!deckLoader)}
				>
					Create Deck
				</button>
				<hr />
			</div>
			{deckLoader ? <Deck /> : null}
		</div>
	);
};

export default DeckList;
