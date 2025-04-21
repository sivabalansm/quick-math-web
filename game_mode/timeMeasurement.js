// Mini stopwatch
class Stopwatch {
	startTime;
	currentTime;
	endTime;
	updateElementFunction = (time) => {
		const stopwatchElement = document.getElementById("problem-stopwatch")
		stopwatchElement.textContent = time;
	};

	#stopwatch

	start() {
		this.startTime = Date.now();
		this.#stopwatch = setInterval(() => {
			this.currentTime = ((Date.now() - this.startTime)/1000).toFixed(2);

	                this.updateElementFunction(this.currentTime);
		}, 10);
	}

	stop() {
		this.endTime = Date.now() - this.startTime;
		clearInterval(this.#stopwatch);
		return this.endTime;
	}
}

class Timer {
	time;
	#startTime;
	
	// our two pseudo async functions (setTimeout, setInterval) variable holders
	#timer;
	#displayUpdateinterval;

	updateInterval = 10;
	updateElementFunction = (time) => {
		const timerElement = document.getElementById("problem-stopwatch");
		timerElement.textContent = time;
	}

	constructor(time) {
		this.time = time;
	}
	start() {
		this.#startTime = Date.now();
		this.#timer = setTimeout(() => {
			clearInterval(this.#displayUpdateinterval);
			this.updateElementFunction(0);
			console.log("sucks to be you");

		}, this.time);

		this.#displayUpdateinterval = setInterval(() => {
			this.updateElementFunction((this.getRemainingTime()/1000).toFixed(2));
		}, this.updateInterval);

	}

	cancel() {
		clearTimeout(this.#timer);
		clearInterval(this.#displayUpdateinterval);
		return (Date.now() - this.#startTime);
	}

		

	getRemainingTime() {
		return this.time - (Date.now() - this.#startTime);
	}

}

export { Stopwatch, Timer };
