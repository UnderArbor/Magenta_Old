import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewDeckButton from './NewDeckButton';
import DeckSlotList from './DeckSlotList';
import ToggleTools from '../MetaTools/ToggleTools';
import MetaTools from '../MetaTools/MetaTools';

export const DeckList = ({ tools, height, func }) => {
	useEffect(() => {}, [height]);

	return (
		<Fragment>
			{!tools ? (
				<div className="deckList" style={{ height: `${height}px` }}>
					<ToggleTools />
					<hr className="normal" />
					<NewDeckButton />
					<hr style={{ backgroundColor: 'var(--secondary-color' }} />
					<div className="deckSlots">
						<DeckSlotList func={func} />
					</div>
				</div>
			) : (
				<div className="deckList">
					<ToggleTools />
					<hr className="normal" />
					<MetaTools />
				</div>
			)}
		</Fragment>
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
