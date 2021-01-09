import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

import { toggleType } from '../../actions/deck';

export const TypeHeader = ({
	type,
	deckId,
	isAuthenticated,
	toggleType,
	index,
}) => {
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
			data-type={type.name}
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
};

const mapStateToProps = (state) => ({
	deckId: state.deck.deckId,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { toggleType })(TypeHeader);
