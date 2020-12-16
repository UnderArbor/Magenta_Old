import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewDeckButton from './NewDeckButton';
import DeckSlotList from './DeckSlotList';
import ToggleTools from '../MetaTools/ToggleTools';
import MetaTools from '../MetaTools/MetaTools';

export const DeckList = ({ tools, height, func }) => {
	useEffect(() => {}, [height]);

	return (
		<div className="toolsList">
			<ToggleTools />
			{!tools ? (
				<div className="deckList" style={{ height: `${height}px` }}>
					<NewDeckButton />
					<hr className="normal" />
					<div className="deckSlots">
						<DeckSlotList func={func} />
					</div>
				</div>
			) : (
				<div className="deckList">
					<MetaTools />
				</div>
			)}
		</div>
	);
};

DeckList.propTypes = {
	tools: PropTypes.bool,
	height: PropTypes.number,
};

const mapStateToProps = (state) => ({
	tools: state.tools.tools,
	height: state.deck.height,
});

export default connect(mapStateToProps)(DeckList);
