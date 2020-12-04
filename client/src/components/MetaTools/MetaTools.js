import React from 'react';
import { connect } from 'react-redux';
import ManaCurve from './ManaCurve';
import DeleteDeckButton from './DeleteDeckButton';
import RegisterButton from './RegisterButton';
import ColumnButtons from './ColumnButtons';

import DeckSlot from '../deck/DeckSlot';

import PropTypes from 'prop-types';

const MetaTools = ({ deckId, isAuthenticated }) => {
	return (
		<div>
			<div className="metaTools">
				<div className="toolsHeader">Name Goes Here</div>
				<DeckSlot func={'Nothing'} key={deckId} id={deckId} />
				<hr className="normal" />
				<div className="manaCurve">
					<ManaCurve />
				</div>
				<hr className="normal" />
				{isAuthenticated ? <DeleteDeckButton /> : <RegisterButton />}
				<hr className="normal" />
				<ColumnButtons />
				<hr className="normal" />
			</div>
		</div>
	);
};

MetaTools.propTypes = {
	isAuthenticated: PropTypes.bool,
	deckId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	deckId: state.deck.deckId,
});

export default connect(mapStateToProps)(MetaTools);
