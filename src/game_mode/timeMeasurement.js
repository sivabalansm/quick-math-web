// Mini stopwatch
class Stopwatch {
	startTime;
	currentTime;
        lapTime;
	endTime;
	updateElementFunction = (time) => {
		const stopwatchElement = document.getElementById("problem-time-measurement")
		stopwatchElement.textContent = time;
	};

	#stopwatch

	start() {
		this.startTime = Date.now();
                this.lapTime = 0;
		this.#stopwatch = setInterval(() => {
			this.currentTime = ((Date.now() - this.startTime)/1000).toFixed(2);

	                this.updateElementFunction(this.currentTime);
		}, 10);
	}

        lap() {
                const timeElapsedSinceLap = this.currentTime - this.lapTime;
                this.lapTime = this.currentTime;
                return timeElapsedSinceLap;
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
	onCancel;
	onTimeout;
	#displayUpdateinterval;

	updateInterval = 10;
	updateElementFunction = (time) => {
		const timerElement = document.getElementById("problem-time-measurement");
		timerElement.textContent = time;
	}



	constructor(time, onCancel = () => null, onTimeout = () => null) {
		this.time = time;
		this.onCancel = onCancel;
		this.onTimeout = onTimeout;
	}



	start() {
		this.#startTime = Date.now();
		this.#timer = setTimeout(() => {
			clearInterval(this.#displayUpdateinterval);
			this.updateElementFunction(0);
			this.onTimeout();
		}, this.time);

		this.#displayUpdateinterval = setInterval(() => {
			this.updateElementFunction((this.getRemainingTime/1000).toFixed(2));
		}, this.updateInterval);

	}

	cancel() {
		clearTimeout(this.#timer);
		clearInterval(this.#displayUpdateinterval);
		this.onCancel();
		return (Date.now() - this.#startTime);
	}

	// getters

	get getInitialTime() {
		return this.time;
	}

	get getRemainingTime() {
		return this.time - (Date.now() - this.#startTime);
	}
}

export { Stopwatch, Timer };
