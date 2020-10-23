import React from 'react';
import { connect } from 'react-redux';
import ManaCurve from './ManaCurve';
import DeleteDeckButton from './DeleteDeckButton';
import ToggleTools from './ToggleTools';
import RegisterButton from './RegisterButton';

import PropTypes from 'prop-types';

const MetaTools = ({ isAuthenticated, toggleTool, openTools }) => {
	return (
		<div>
			{openTools ? (
				<div className="metaTools">
					<div
						className="metaHeader"
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<p>Tools</p>
						<ToggleTools
							toggleTool={toggleTool}
							character={88}
							openTools={openTools}
						/>
					</div>
					<div className="manaCurve">
						<ManaCurve />
						{isAuthenticated ? <DeleteDeckButton /> : <RegisterButton />}
					</div>
				</div>
			) : (
				<div style={{ position: 'relative' }}>
					<ToggleTools
						toggleTool={toggleTool}
						character={62}
						openTools={openTools}
					/>
				</div>
			)}
		</div>
	);
};

MetaTools.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(MetaTools);
