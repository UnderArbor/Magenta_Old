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
					style={{
						border: '1px outset',
						fontsize: '60px',
						color: 'var(--main-bg-color)',
						backgroundcolor: 'var(--backdrop-color)',
						margin: '16px',
						opacity: '40%',
						width: '200px',
						height: '200px',
						cursor: 'pointer',
						borderradius: '15px',
					}}
					onClick={() => setDeckLoader(!deckLoader)}
				>
					+
				</button>
				<hr />
			</div>
			{deckLoader ? <Deck /> : null}
		</div>
	);
};

export default DeckList;
