import { maxFromDigits, randNum, randomSumProblem } from './mentalMathProblems.js';
import { Stopwatch, Timer } from './timeMeasurement.js';



const params = new URLSearchParams(window.location.search);
const gameParams = JSON.parse(params.get("options"));

const gameMode = gameParams.gameMode;
const gameModeOptions = gameParams.options;


// Helper functions
function waitForCorrectAnswer(correctAnswer) {
	return new Promise(resolve => {
		document.getElementById("answer").addEventListener("input", function(event) {
			let inputAnswer = event.target.value;
			if (inputAnswer == correctAnswer) {
				event.target.removeEventListener("input", waitForCorrectAnswer);
				event.target.value = '';
				resolve();
			}
		});
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
			break;
		case "div":
			break;
	}
	if (currentProblem) {
		clearAndAppendNumsFromArray(currentProblem.problem);
		console.log(currentProblem.getAnswer());
		await waitForCorrectAnswer(currentProblem.getAnswer());
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
				for (let problemNum = 1;;problemNum++) {
					let timer = new Timer(10 * 1000);
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
