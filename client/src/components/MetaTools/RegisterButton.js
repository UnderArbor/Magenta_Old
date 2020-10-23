import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Notification from '../util-component/Notification';

import { openModalAuth } from '../../actions/auth';

const RegisterButton = ({ openModalAuth }) => {
	return (
		<div
			className="registerContainer"
			style={{
				padding: '16px 0',
			}}
		>
			<div className="registerPulse" style={{ position: 'relative' }}>
				<button
					style={{
						display: 'block',
						position: 'relative',
						margin: '16px auto',
						top: '16px',
						border: 'none',
						backgroundColor: '#a5a',
						padding: '8px',
						color: 'white',
					}}
					onClick={() => openModalAuth()}
				>
					Login/Register
					<Notification />
				</button>
			</div>
		</div>
	);
};

RegisterButton.propTypes = { openModalAuth: PropTypes.func.isRequired };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { openModalAuth })(RegisterButton);
