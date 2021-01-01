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
				{/* <div className="colorSelection">
					<ColorPicker
						color={style.getPropertyValue('--header-color')}
						title="Header"
						cssVar="--header-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--main-color')}
						title="Main"
						cssVar="--main-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--tool-color')}
						title="Tool"
						cssVar="--tool-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--deck-color')}
						title="Deck"
						cssVar="--deck-color"
					/>
					<ColorPicker
						color={style.getPropertyValue('--backdrop-color')}
						title="Backdrop"
						cssVar="--backdrop-color"
					/>
				</div> */}
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
