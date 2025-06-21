import { StatPoint, Stats } from './stats.js';
import { rangeOfNums } from './utils.js';
import { renderChart, handleResizeChartRender, renderStatAfterCharts } from './render.js';

const ctx = document.getElementById('myChart');
let score = sessionStorage.getItem("score");

const YELLOWCOLOR = getComputedStyle(document.documentElement).getPropertyValue('--primary-yellow').trim()

class Score {
	problemTypeStats = null;
        problemType = null;

	constructor(stats, problemType) {
		this.problemTypeStats = stats.pointList[problemType];
                this.problemType = problemType;
	}

	createChart(description, getDataFromPointFunc) {
                if (this.problemTypeStats.length > 0) 
                        return {
                                        type: 'line',
                                        data: {
                                                labels: rangeOfNums(1, this.problemTypeStats.length + 1),
                                                datasets: [{
                                                        label: description,
                                                        data: this.problemTypeStats.map(getDataFromPointFunc),
                                                        borderWidth: 1,
							borderColor: YELLOWCOLOR
                                                }]
                                        },
                                        options: {
						responsive: true,
						maintainAspectRatio: true,
                                                scales: {
                                                        y: {
                                                                beginAtZero: true
                                                        }
                                                }
                                        }
                        };
                throw new Error(`${this.problemType} problem type has no data points`);
                return null;
	}
}

class RenderScoreChart {
        #score = null;
        constructor(score) {
                this.#score = score;
        }

        #renderCustomChart(chart) {
                renderChart(this.#score.problemType, chart);
        }

        renderTimeChart() {
                let timeChart = this.#score.createChart(`Time of each ${this.#score.problemType} problem in seconds`, (statPoint) => statPoint.time);
                this.#renderCustomChart(timeChart);
        }

        renderDPSChart() {
                let dpsChart = this.#score.createChart(`Digits per second of each ${this.#score.problemType} problem`, (statPoint) => statPoint.digitPerSec());
                this.#renderCustomChart(dpsChart);
        }

}

class RenderGameStats {
	#stats = null;
	#averageTimes = null;
	#totalTimes = null;

	constructor(stats) {
		this.#stats = stats;
		this.#averageTimes = stats.meanTime();
		this.#totalTimes = stats.totalTime();
	}

	renderAverageTimes() {
		for (const problemType in this.#averageTimes) {
			const averageTime = this.#averageTimes[problemType];
			averageTime && renderStatAfterCharts(problemType, "Average Time", averageTime);
		}
	}

	renderTotalTimes() {
		for (const problemType in this.#totalTimes) {
			const totalTime = this.#totalTimes[problemType];
			totalTime && renderStatAfterCharts(problemType, "Total Time", totalTime);
		}
	}

	renderTotal() {
		const totalTimeTaken = Object.values(this.#totalTimes).reduce((a, b) => a + b, 0);
		renderStatAfterCharts("scoreboard", "Total Time Taken", totalTimeTaken);
	}
}



let stats = Stats.fromJsonString(score);
let scoreMult = new Score(stats, "mult");
let scoreSums = new Score(stats, "sums");
let scoreDiv = new Score(stats, "div");

function showMyScore(score) {
        let scoreCharts = new RenderScoreChart(score);
        scoreCharts.renderTimeChart();
        scoreCharts.renderDPSChart();

}

showMyScore(scoreSums);
showMyScore(scoreMult);

let gameStats = new RenderGameStats(stats);
gameStats.renderTotalTimes();
gameStats.renderAverageTimes();
gameStats.renderTotal();

handleResizeChartRender();

