import { StatPoint, Stats } from './stats.js';

const ctx = document.getElementById('myChart');

let score = sessionStorage.getItem("score");

if (score) {
	console.log(score);
}

new Chart(ctx, {
	type: 'line',
	data: {
		labels: ['Red', 'Blue'],
		datasets: [{
			label: 'yo hello',
			data: [12, 19],
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
