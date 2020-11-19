import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { openTools, closeTools } from '../../actions/tools';

const ToggleTools = ({ tools, deckName, openTools, closeTools }) => {
	const deckStyle = tools ? 'tools' : 'tools activeTools';

	const toolsStyle =
		deckName === ''
			? 'tools inactiveTools'
			: !tools
			? 'tools'
			: 'tools activeTools';

	return (
		<div className="toolsContainer">
			<button className={deckStyle} onClick={() => closeTools()}>
				Decks
			</button>
			<button
				className={toolsStyle}
				disabled={!deckName}
				onClick={() => openTools()}
			>
				Tools
			</button>
		</div>
	);
};

ToggleTools.propTypes = {
	tools: PropTypes.bool.isRequired,
	deckName: PropTypes.string,
	openTools: PropTypes.func.isRequired,
	closeTools: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	tools: state.tools.tools,
	deckName: state.deck.deckName,
});

export default connect(mapStateToProps, { openTools, closeTools })(ToggleTools);
