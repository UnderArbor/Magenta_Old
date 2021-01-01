import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { openModalAuth } from '../../actions/auth';

const RegisterButton = ({ openModalAuth }) => {
	return (
		<div className="redButtonContainer">
			<button className="redToolsButton" onClick={() => openModalAuth()}>
				Login / Register
			</button>
		</div>
	);
};

RegisterButton.propTypes = { openModalAuth: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { openModalAuth })(RegisterButton);
