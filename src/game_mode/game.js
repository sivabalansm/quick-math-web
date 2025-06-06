import { generateProblem } from './mentalMath/mentalMathProblems.js';
import { Stopwatch, Timer } from './timeMeasurement.js';
import { renderProblem, renderProblemNum } from './render.js';
// import { StatPoint, Stats } from './stats.js';


// Params from url for game
const params = new URLSearchParams(window.location.search);
const gameParams = JSON.parse(params.get("options"));

const gameMode = gameParams.gameMode;
const gameModeOptions = gameParams.options;


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

// gameModeOptions just contains sums, mult and div options
function getNextProblemSet(problemNum, gameModeOptions) {
        let optionJson = gameModeOptions[(problemNum - 1) % gameModeOptions.length];
	let currentProblem = generateProblem(optionJson);
        return { problemNum, currentProblem };
}

// Handle Game Display 
async function handleGameDisplay({ problemNum, currentProblem }) { 
	renderProblemNum(problemNum);

        renderProblem(currentProblem.problem);
		
        console.log(currentProblem.answer);
        await waitForCorrectAnswer(currentProblem.answer);
        // return a stat bit that aggregates to a Stat object
        
}

// Handle different game 
function handleGame(gameMode, gameModeOptions) {
	let startGame = null;
	// let stats = new Stats();
        const gameFixedNumOfProblems = async (NumOfProblems) => {
                // Describe the game (look at case name)
                const stopwatch = new Stopwatch();
                stopwatch.start();
                for (let problemNum = 1 ; problemNum <= NumOfProblems; problemNum++) {
                        let problemSet = getNextProblemSet(problemNum, gameModeOptions);
                        await handleGameDisplay(problemSet);
                }
                console.log(stopwatch.stop());
        }

	switch (gameMode) {
		case "casual":
                        const CASUAL_MODE_ITERATIONS = 40;
			startGame = gameFixedNumOfProblems(CASUAL_MODE_ITERATIONS);
			break;

		case "quick":
                        const QUICK_MODE_ITERATIONS = 5;
			startGame = gameFixedNumOfProblems(QUICK_MODE_ITERATIONS);
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

                                        let problemSet = getNextProblemSet(problemNum, gameModeOptions);
					await handleGameDisplay(problemSet);

					console.log(timer.cancel());
				}
			}
			break;

	}
	return startGame;

}

const game = handleGame(gameMode, gameModeOptions);
game();
