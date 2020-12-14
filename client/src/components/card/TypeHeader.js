import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

import { toggleType, moveType } from '../../actions/deck';

export const TypeHeader = ({
	type,
	deckId,
	isAuthenticated,
	toggleType,
	moveType,
	index,
}) => {
	function handleDragStart(e) {
		e.stopImmediatePropagation();
		this.style.opacity = 0.4;
		let dropZone = document.querySelectorAll('.dropZone');
		dropZone.forEach(function (item) {
			item.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
		});

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('headerInfo', this.dataset.id);
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

		this.style.border = '1px solid white';
	}

	function handleDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';

		return false;
	}

	function handleDragLeave(e) {
		e.stopPropagation();
		this.style.border = 'none';
	}

	function handleDrop(e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		this.style.border = 'none';

		const prevIndex = e.dataTransfer.getData('headerInfo');
		const newIndex = this.dataset.id;

		if (prevIndex) {
			moveType(prevIndex, newIndex);
		}

		e.dataTransfer.clearData();

		return false;
	}

	var quantity = 0;
	for (var i = 0; i < type.cards.length; ++i) {
		quantity = Number(quantity) + Number(type.cards[i].quantity);
	}

	const className = type.open ? 'arrow-down active' : 'arrow-down';

	return (
		<div
			className="typeHeader"
			id="typeHeader"
			data-id={index}
			data-type={type}
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
				{type.name} ({quantity}){type.open ? null : '...'}
			</p>
			<button
				className={className}
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
			></button>
		</div>
	);
};

TypeHeader.propTypes = {
	deckId: PropTypes.string.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	toggleType: PropTypes.func.isRequired,
	moveType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { toggleType, moveType })(TypeHeader);
