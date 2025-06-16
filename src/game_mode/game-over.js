import { StatPoint, Stats } from './stats.js';
import { rangeOfNums } from './utils.js';
import { renderChart } from './render.js';

const ctx = document.getElementById('myChart');
let score = sessionStorage.getItem("score");


class Score {
	stats = null;

	constructor(stats) {
		this.stats = stats;
	}

	createChart(description, getDataFromPointFunc) {
		return {
				type: 'line',
				data: {
					labels: rangeOfNums(1, this.stats.length + 1),
					datasets: [{
						label: description,
						data: this.stats.map(getDataFromPointFunc),
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
		};
	}
}


let stats = Stats.fromJsonString(score);
let scoreMult = new Score(stats.pointList["mult"]);
let scoreSums = new Score(stats.pointList["sums"]);
let scoreDiv = new Score(stats.pointList["div"]);

let multTimeChart = scoreMult.createChart("multTimeChart", (statPoint) => statPoint.time); 
renderChart("mult", multTimeChart);
let multDpsChart = scoreMult.createChart("multDpsChart", (statPoint) => statPoint.digitPerSec()); 
renderChart("mult", multDpsChart);

let sumsTimeChart = scoreSums.createChart("sumsTimeChart", (statPoint) => statPoint.time); 
renderChart("sums", sumsTimeChart);
let sumsDpsChart = scoreSums.createChart("sumsDpsChart", (statPoint) => statPoint.digitPerSec()); 
renderChart("sums", sumsDpsChart);
