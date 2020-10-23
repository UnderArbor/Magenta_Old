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
	deckId,
	saveName,
	deckName,
}) => {
	const [tempName, setTempName] = useState('');

	const [openTools, setOpenTools] = useState(false);

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
					height: '1000px',
				}}
			>
				No Deck Loaded<div style={{ fontSize: '16px' }}>Import deck here</div>
			</div>
		);
	}

	const toggleTool = () => {
		setOpenTools(!openTools);
	};

	const keyPress = async (e) => {
		if (tempName !== '' && (e.key === 'Enter' || e === 'blur')) {
			if (isAuthenticated) {
				await axios
					.put(`/api/deck/${deckId}/${tempName}`)
					.then((res) => saveName(res.data.name));
			} else {
				saveName(tempName);
			}
			setTempName('');
		}
	};

	return (
		<Fragment>
			<div className="wholeDeck">
				<div
					className="deckContent"
					style={{
						width: '100%',
					}}
				>
					<DeckNameDisplay
						deckName={deckName}
						tempName={tempName}
						setTempName={setTempName}
						keyPress={keyPress}
						openTools={openTools}
						toggleTool={toggleTool}
					/>

					<SearchBar deckId={deckId} />

					<hr className="normal" />

					<div className="cardArea">
						{!loading ? <CardList /> : <div>Loading...</div>}
					</div>
				</div>
				<MetaTools toggleTool={toggleTool} openTools={openTools} />
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
	deckId: PropTypes.string,
	saved: PropTypes.bool,
	deckName: PropTypes.string,
};

const mapStateToProps = (state) => ({
	showDeck: state.deck.showDeck,
	loading: state.deck.loading,
	isAuthenticated: state.auth.isAuthenticated,
	deckId: state.deck.deckId,
	saved: state.deck.saved,
	deckName: state.deck.deckName,
});

export default connect(mapStateToProps, { openModalAuth, saveName, saveDeck })(
	Deck
);
