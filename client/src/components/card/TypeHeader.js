import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

import { toggleType, moveType } from '../../actions/deck';

export const TypeHeader = ({ type, deckId, isAuthenticated, toggleType }) => {
	function handleDragStart(e) {
		e.stopPropagation();
		this.style.opacity = 0.4;
		let dropZone = document.querySelectorAll('.dropZone');
		dropZone.forEach(function (item) {
			item.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
		});
	}

	function handleDragEnd(e) {
		e.stopPropagation();
		this.style.opacity = 1;
		let dropZone = document.querySelectorAll('.dropZone');
		dropZone.forEach(function (item) {
			item.style.backgroundColor = '';
		});
	}

	function handleDragEnter(e) {
		e.stopPropagation();
		this.style.height = '48px';
		this.style.border = '1px solid white';
	}

	function handleDragOver(e) {
		e.preventDefault();

		return false;
	}

	function handleDragLeave(e) {
		e.stopPropagation();
		this.style.height = '12px';
		this.style.border = 'none';
	}

	function handleDrop(e) {
		e.stopImmediatePropagation();
		e.preventDefault();

		console.log('Hup');
		this.style.height = '12px';
		this.style.border = 'none';
		moveType();
		return false;
	}

	return (
		<div
			className="typeHeader"
			id="typeHeader"
			draggable="true"
			onMouseOver={(e) => {
				let typeHeader = document.querySelectorAll('.typeHeader');

				typeHeader.forEach(function (item) {
					item.addEventListener('dragstart', handleDragStart, false);
					item.addEventListener('dragend', handleDragEnd, false);
				});

				let dropZone = document.querySelectorAll('.dropZone');

				dropZone.forEach(function (item) {
					item.addEventListener('dragenter', handleDragEnter, false);
					item.addEventListener('dragover', handleDragOver, false);
					item.addEventListener('dragleave', handleDragLeave, false);
					item.addEventListener('drop', handleDrop, false);
				});
			}}
		>
			<p className="typeName">
				{type.name} ({type.cards.length}){type.open ? null : '...'}
			</p>
			<button
				className="toggleArea"
				onClick={async () => {
					toggleType(type.name, type.open);
					if (isAuthenticated) {
						const config = {
							headers: {
								'Content-Type': 'application/json',
							},
						};

						const body = await JSON.stringify({
							id: type._id,
							kind: 'open',
							shape: !type.open,
						});
						await axios.put(
							`/api/deck/types/typeChange/${deckId}`,
							body,
							config
						);
					}
				}}
			>
				Up
			</button>
		</div>
	);
};

TypeHeader.propTypes = {
	deckId: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	toggleType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { toggleType })(TypeHeader);
