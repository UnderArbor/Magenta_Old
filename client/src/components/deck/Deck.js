import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CardList from '../card/CardList';
import SearchBar from './SearchBar';
import DeckNameDisplay from './DeckNameDisplay';
import FileUpload from './FileUpload';

import { openModalAuth } from '../../actions/auth';
import { saveName, importDeck, openDeck } from '../../actions/deck';
import axios from 'axios';

const Deck = ({
	showDeck,
	types,
	loading,
	isAuthenticated,
	deckId,
	saveName,
	importDeck,
	openDeck,
	deckName,
	columnCount,
}) => {
	const [tempName, setTempName] = useState('');

	useEffect(() => {
		setTempName('');
	}, [deckId]);

	if (!showDeck) {
		return (
			<div
				className="wholeDeck"
				id="wholeDeck"
				style={{
					color: 'lightgray',
					textAlign: 'center',
					fontSize: '32px',
					alignItems: 'center',
					paddingTop: '25%',
				}}
			>
				No Deck Loaded
				<FileUpload
					importDeck={importDeck}
					openDeck={openDeck}
					isAuthenticated={isAuthenticated}
				/>
			</div>
		);
	}

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
					/>

					<SearchBar deckId={deckId} />
					{!loading ? (
						<CardList types={types} />
					) : (
						<div
							style={{
								textAlign: 'center',
								margin: 'auto',
								alignItems: 'center',
								color: 'white',
								fontSize: '36px',
							}}
						>
							Loading...
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
};

Deck.propTypes = {
	types: PropTypes.array.isRequired,
	columnCount: PropTypes.number.isRequired,
	showDeck: PropTypes.bool,
	loading: PropTypes.bool,
	isAuthenticated: PropTypes.bool,
	openModalAuth: PropTypes.func.isRequired,
	saveName: PropTypes.func.isRequired,
	importDeck: PropTypes.func.isRequired,
	openDeck: PropTypes.func.isRequired,
	deckId: PropTypes.string,
	deckName: PropTypes.string,
};

const mapStateToProps = (state) => ({
	types: state.deck.types,
	showDeck: state.deck.showDeck,
	loading: state.deck.loading,
	isAuthenticated: state.auth.isAuthenticated,
	deckId: state.deck.deckId,
	deckName: state.deck.deckName,
	columnCount: state.tools.columnCount,
});

export default connect(mapStateToProps, {
	openModalAuth,
	saveName,
	importDeck,
	openDeck,
})(Deck);
