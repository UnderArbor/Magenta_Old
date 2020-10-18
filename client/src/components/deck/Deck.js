import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardList from '../card/CardList';
import SearchBar from './SearchBar';
import DeckNameDisplay from './DeckNameDisplay';
import MetaTools from '../MetaTools/MetaTools';

import { openModalAuth } from '../../actions/auth';
import { saveName, saveDeck } from '../../actions/deck';
import axios from 'axios';

const Deck = ({
	showDeck,
	loading,
	isAuthenticated,
	openModalAuth,
	deckId,
	saved,
	saveName,
	saveDeck,
	cards,
	deckName,
}) => {
	const [tempName, setTempName] = useState('');

	useEffect(() => {
		setTempName('');
	}, [deckId]);

	if (!showDeck) {
		return (
			<div
				className="wholeDeck"
				style={{
					color: 'lightgray',
					textAlign: 'center',
					display: 'block',
					fontSize: '32px',
					alignItems: 'center',
					margin: '0',
					paddingTop: '25%',
					// opacity: '60%',
					height: '1000px',
				}}
			>
				No Deck Loaded<div style={{ fontSize: '16px' }}>Import deck here</div>
			</div>
		);
	}

	const keyPress = async (e) => {
		if (tempName !== '' && (e.key === 'Enter' || e === 'blur')) {
			if (saved) {
				await axios
					.put(`/api/deck/${deckId}/${tempName}`)
					.then((res) => saveName(res.data.name));
			} else {
				saveName(tempName);
			}
			setTempName('');
		}
	};

	const deckContent = saved ? 'deckContent' : 'unsavedContent';

	return (
		<Fragment>
			<div className="wholeDeck">
				<div className={deckContent}>
					{!isAuthenticated ? (
						<div>
							<button
								style={{
									backgroundColor: '#d44',
									color: 'white',
									width: '100%',
									fontSize: '36px',
								}}
								onClick={() => openModalAuth()}
							>
								Must have account to save deck. Click here to register
							</button>
						</div>
					) : !saved ? (
						<div>
							<button
								style={{
									backgroundColor: '#d44',
									color: 'white',
									width: '100%',
									fontSize: '36px',
								}}
								onClick={async () => await saveDeck(cards, deckName)}
							>
								New Deck. Click to Save
							</button>
						</div>
					) : (
						<DeckNameDisplay
							deckName={deckName}
							tempName={tempName}
							setTempName={setTempName}
							keyPress={keyPress}
						/>
					)}

					<SearchBar deckId={deckId} />

					{saved ? <hr className="normal" /> : <hr className="unsaved" />}

					<div className="cardArea">
						{!loading ? <CardList /> : <div>Loading...</div>}
					</div>
				</div>
				<MetaTools />
			</div>
		</Fragment>
	);
};

Deck.propTypes = {
	showDeck: PropTypes.bool,
	loading: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	openModalAuth: PropTypes.func.isRequired,
	saveName: PropTypes.func.isRequired,
	saveDeck: PropTypes.func.isRequired,
	deckId: PropTypes.string,
	saved: PropTypes.bool,
	cards: PropTypes.array,
	deckName: PropTypes.string,
};

const mapStateToProps = (state) => ({
	showDeck: state.deck.showDeck,
	loading: state.deck.loading,
	isAuthenticated: state.auth.isAuthenticated,
	deckId: state.deck.deckId,
	saved: state.deck.saved,
	cards: state.deck.cards,
	deckName: state.deck.deckName,
});

export default connect(mapStateToProps, { openModalAuth, saveName, saveDeck })(
	Deck
);
