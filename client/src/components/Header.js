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
			<div className="home"></div>
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
				<button
					className="colorButton"
					onClick={() => setColorToggle(!colorToggle)}
				>
					Toggle Colors
				</button>
			</div>
			<div>
				{colorToggle ? (
					<div className="colorSelection">
						<ColorPicker
							color={style.getPropertyValue('--header-color')}
							title="Header"
							cssVar="--header-color"
						/>
						<ColorPicker
							color={style.getPropertyValue('--header-text-color')}
							title="H-text"
							cssVar="--header-text-color"
						/>
						<ColorPicker
							color={style.getPropertyValue('--main-bg-color')}
							title="Body"
							cssVar="--main-bg-color"
						/>
						<ColorPicker
							color={style.getPropertyValue('--secondary-color')}
							title="Secondary"
							cssVar="--secondary-color"
						/>
						<ColorPicker
							color={style.getPropertyValue('--backdrop-color')}
							title="Container"
							cssVar="--backdrop-color"
						/>
					</div>
				) : (
					<div
						style={{
							float: 'left',
							fontSize: '24px',
							marginRight: '434px',
							paddingLeft: '16px',
							flexGrow: '2',
						}}
					>
						Magenta 0.1
					</div>
				)}
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
