import { maxFromDigits, randNum, randomSumProblem, randomMultProblem, randomDivProblem } from './mentalMathProblems.js';
import { Stopwatch, Timer } from './timeMeasurement.js';



const params = new URLSearchParams(window.location.search);
const gameParams = JSON.parse(params.get("options"));

const gameMode = gameParams.gameMode;
const gameModeOptions = gameParams.options;


// Helper functions
function waitForCorrectAnswer(correctAnswer) {
	return new Promise(resolve => {
		const answerElement = document.getElementById("answer");
		function handleUserAnswer(event) {
			let inputAnswer = event.target.value;
			if (inputAnswer == correctAnswer) {
				event.target.removeEventListener("input", handleUserAnswer);
				event.target.value = '';
				resolve();
			}
		}
		answerElement.addEventListener("input", handleUserAnswer);
	});
}




// Array of numbers -> Html list of elements
function appendNumsFromArray(numArray) {
	const problemElement = document.getElementById("problem");

	for (const num of numArray) {
		const numContainer = document.createElement("div");
		numContainer.classList.add("equation-number");
		numContainer.textContent = num;
		problemElement.appendChild(numContainer);
	}
}

function clearNums() {
	document.getElementById("problem").innerHTML = "";
}

function clearAndAppendNumsFromArray(numArray) {
	clearNums();
	appendNumsFromArray(numArray);
}


// Handle Game Display and compute the problems
async function handleGameDisplay(problemNum, gameModeOptions) { // gameModeOptions just contains sums, mult and div options
	let optionJson = gameModeOptions[(problemNum - 1) % gameModeOptions.length];
	document.getElementById("problem-number").innerHTML = problemNum;

	const option1 = optionJson.option1;
	const option2 = optionJson.option2;

	let currentProblem = null;

	switch (optionJson.type) {
		case "sums":
			currentProblem = randomSumProblem(0, maxFromDigits(option1), true, option2);
			break;
		case "mult":
			currentProblem = randomMultProblem(option1, option2);
			break;
		case "div":
			currentProblem = randomDivProblem(option1, option2);
			break;
	}
	if (currentProblem) {
		clearAndAppendNumsFromArray(currentProblem.problem);
		
		console.log(currentProblem.answer);
		await waitForCorrectAnswer(currentProblem.answer);
                // return a stat bit that aggregates to a Stat object
        
	}
}

// Handle different game 
function handleGame(gameMode, gameModeOptions) {
	let startGame = null;
	switch (gameMode) {
		case "casual":
			startGame = async () => {
				// Describe the game (look at case name)
				const stopwatch = new Stopwatch();
				stopwatch.start();
				const CASUAL_MODE_ITERATIONS = 40;
				for (let problemNum = 1 ; problemNum <= CASUAL_MODE_ITERATIONS; problemNum++) {
					await handleGameDisplay(problemNum, gameModeOptions);
				}
				console.log(stopwatch.stop());
			}
			break;

		case "quick":
			startGame = async () => {
				// Describe the game (look at case name)
				const stopwatch = new Stopwatch();
				stopwatch.start();
				const QUICK_MODE_ITERATIONS = 5;
				for (let problemNum = 1 ; problemNum <= QUICK_MODE_ITERATIONS; problemNum++) {
					await handleGameDisplay(problemNum, gameModeOptions);
				}
				console.log(stopwatch.stop());
			}
			break;
		case "countdown":
			startGame = async () => {
				const reductionRate = 0.95;
				let currentTime = 60; // initial time
				const reduceTime = () => { currentTime = currentTime * reductionRate }; // add an option to add the stats bit
                                // create a new stat object to aggregate stats, get time it takes to do 1 problem, make sure stat object has gameModeOptions as a paramter
                                // new stat point has time taken to do problem, problem, problem type 
                                // every problem type has a different stat chart
                                // game-over.js will iterate over stats and make the graphs accordingly

				for (let problemNum = 1;;problemNum++) {
					let timer = new Timer(currentTime * 1000, reduceTime);
					timer.start();

					await handleGameDisplay(problemNum, gameModeOptions);

					console.log(timer.cancel());
				}

			}
			break;

	}
	return startGame;

}

const game = handleGame(gameMode, gameModeOptions);
game();
