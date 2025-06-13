import { StatPoint, Stats } from './stats.js';

const ctx = document.getElementById('myChart');

let score = sessionStorage.getItem("score");

function arrayRangeNum(start, stop) {
	return Array.from({length: stop - start}, (value, index) => start + index);
}

if (score) {
	// console.log(score);
	let stats = Stats.fromJsonString(score);
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: arrayRangeNum(1, stats.pointList["sums"].length + 1),
			datasets: [{
				label: 'Time taken per problem',
				data: stats.pointList["sums"].map((statPoint) => statPoint.time),
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}


