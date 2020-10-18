import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const ManaCurve = ({ cards }) => {
	var cmcArray = [];
	if (cards.length > 0) {
		cards.map((card) => {
			if (!card.types.includes('Land')) {
				if (cmcArray[card.cmc] === undefined) {
					return (cmcArray[card.cmc] = card.quantity);
				} else {
					return (cmcArray[card.cmc] = cmcArray[card.cmc] + card.quantity);
				}
			} else {
				return null;
			}
		});
	} else {
		cmcArray[0] = 0;
	}

	for (var i = 0; i < cmcArray.length; ++i) {
		if (cmcArray[i] === undefined) {
			cmcArray[i] = 0;
		}
	}

	const labels = cmcArray.map((buffer, index) => {
		return index;
	});

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Amount',
				yAxisID: 'amount',
				backgroundColor: getComputedStyle(
					document.documentElement
				).getPropertyValue('--header-color'),
				borderColor: getComputedStyle(
					document.documentElement
				).getPropertyValue('--backdrop-color'),
				hoverBackgroundColor: getComputedStyle(
					document.documentElement
				).getPropertyValue('--header-text-color'),
				borderWidth: 2,
				data: cmcArray,
			},
		],
	};

	return (
		<Bar
			data={data}
			options={{
				title: { display: true, text: 'Mana Curve', fontSize: 20 },
				legend: { display: false },
				scales: {
					yAxes: [
						{
							id: 'amount',
							ticks: { min: 0, suggestedMax: 6 },
						},
					],
					xAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: 'Converted Mana Cost',
							},
						},
					],
				},
			}}
		/>
	);
};

ManaCurve.propTypes = {
	cards: PropTypes.array,
};

const mapStateToProps = (state) => ({
	cards: state.deck.cards,
});

export default connect(mapStateToProps)(ManaCurve);
