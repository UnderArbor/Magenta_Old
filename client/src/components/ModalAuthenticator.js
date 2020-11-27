import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register, login, closeModalAuth, loadUser } from '../actions/auth';
import { saveDeck } from '../actions/deck';

const ModalAuthenticator = ({
	isAuthenticated,
	login,
	register,
	modalAuth,
	closeModalAuth,
	saveDeck,
	deckName,
	types,
	loadUser,
}) => {
	const showHideClassName = modalAuth
		? 'modal display-block'
		: 'modal display-none';

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		loginEmail: '',
		loginPassword: '',
	});

	const {
		name,
		email,
		password,
		password2,
		loginEmail,
		loginPassword,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match', 'danger');
		} else {
			await register({ name, email, password });
			await saveDeck(types, deckName);
			await loadUser();
		}
	};

	const onLogin = async (e) => {
		e.preventDefault();
		login(loginEmail, loginPassword);
	};

	return (
		<Fragment>
			{!isAuthenticated && (
				<div className={showHideClassName}>
					<section className="modal-box">
						<form className="login-form" onSubmit={(e) => onLogin(e)}>
							<div className="authHeader">Login</div>
							<div className="form-group">
								<input
									className="authInput"
									type="email"
									placeholder="Email Address"
									name="loginEmail"
									value={loginEmail}
									onChange={(e) => onChange(e)}
									required
								/>
								<input
									className="authInput"
									type="password"
									placeholder="Password"
									name="loginPassword"
									value={loginPassword}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<button
								className="authButton"
								type="button"
								onClick={(e) => onLogin(e)}
							>
								Log In
							</button>
							<button
								className="authButton"
								type="button"
								onClick={() => closeModalAuth()}
							>
								close
							</button>
						</form>
						<form
							className="register-form"
							onSubmit={(e) => {
								console.log(e);
								onSubmit(e);
							}}
						>
							<div className="authHeader">Register</div>
							<div className="form-group">
								<input
									className="authInput"
									type="text"
									placeholder="Name"
									name="name"
									value={name}
									onChange={(e) => onChange(e)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									className="authInput"
									type="email"
									placeholder="Email Address"
									name="email"
									value={email}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className="form-group">
								<input
									className="authInput"
									type="password"
									placeholder="Password"
									name="password"
									minLength="6"
									value={password}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className="form-group">
								<input
									className="authInput"
									type="password"
									placeholder="Confirm Password"
									name="password2"
									minLength="6"
									value={password2}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<button className="authButton" onClick={(e) => onSubmit(e)}>
								Register
							</button>
							<button className="authButton" onClick={() => closeModalAuth()}>
								close
							</button>
						</form>
					</section>
				</div>
			)}
		</Fragment>
	);
};

ModalAuthenticator.propTypes = {
	register: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	closeModalAuth: PropTypes.func.isRequired,
	saveDeck: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	user: PropTypes.object,
	modalAuth: PropTypes.bool.isRequired,
	types: PropTypes.array,
	deckName: PropTypes.string,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
	modalAuth: state.auth.modalAuth,
	types: state.deck.types,
	deckName: state.deck.deckName,
});

export default connect(mapStateToProps, {
	register,
	login,
	closeModalAuth,
	saveDeck,
	loadUser,
})(ModalAuthenticator);
