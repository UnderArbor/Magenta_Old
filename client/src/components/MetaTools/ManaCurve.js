import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const ManaCurve = ({ types }) => {
	var cmcArray = [];
	types.map((type) => {
		if (!type.name.includes('Land')) {
			for (var i = 0; i < type.cards.length; ++i) {
				if (cmcArray[type.cards[i].cmc] === undefined) {
					cmcArray[type.cards[i].cmc] = Number(type.cards[i].quantity);
				} else {
					cmcArray[type.cards[i].cmc] =
						cmcArray[type.cards[i].cmc] + Number(type.cards[i].quantity);
				}
			}
		} else {
			return null;
		}
		return null;
	});

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
	types: PropTypes.array,
};

const mapStateToProps = (state) => ({
	types: state.deck.types,
});

export default connect(mapStateToProps)(ManaCurve);
