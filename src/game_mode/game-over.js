import { StatPoint, Stats } from './stats.js';
import { rangeOfNums } from './utils.js';

const ctx = document.getElementById('myChart');

let score = sessionStorage.getItem("score");

if (score) {
	// console.log(score);
	let stats = Stats.fromJsonString(score);
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: rangeOfNums(1, stats.pointList["sums"].length + 1),
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

class Score {
	stats = null;

	constructor(stats) {
		this.stats = stats;
	}

}
