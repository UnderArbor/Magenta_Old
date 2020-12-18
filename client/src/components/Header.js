import React, { useState } from 'react';
import ColorPicker from './ColorPicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout, openModalAuth } from '../actions/auth';

export const Header = ({ isAuthenticated, logout, openModalAuth }) => {
	const style = getComputedStyle(document.documentElement);

	const [colorToggle, setColorToggle] = useState(false);

	return (
		<div className="header">
			<div className="headerContent">
				<div
					style={{
						float: 'left',
						fontSize: '36px',
					}}
				>
					Magenta 0.2
				</div>
				<div className="headerButton">
					{!isAuthenticated ? (
						<button className="login" onClick={() => openModalAuth()}>
							Log In
						</button>
					) : (
						<button className="logout" onClick={() => logout()}>
							Log Out
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
	logout: PropTypes.func.isRequired,
	openModalAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout, openModalAuth })(Header);
