import { generateProblem } from './mentalMath/mentalMathProblems.js';
import { Stopwatch, Timer } from './timeMeasurement.js';
import { renderProblem, renderProblemNum } from './render.js';
import { StatPoint, Stats } from './stats.js';


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
function getNextProblemProp(problemNum, gameModeOptions) {
        const problemProperty = gameModeOptions[(problemNum - 1) % gameModeOptions.length];
	return problemProperty;
}

// Handle Game Display 
async function handleGameDisplay(problemNum, currentProblem) { 
	renderProblemNum(problemNum);

        renderProblem(currentProblem.problem);
		
        console.log(currentProblem.answer);
        await waitForCorrectAnswer(currentProblem.answer);
        // return a stat bit that aggregates to a Stat object
        
}

class Game {
        #stats = new Stats()
        #game = null
        #gameModeOptions = null;

        get game() {
                return this.#game;
        }

        #gameSetError() {
                throw new Error("Game Mode already set");
        }

        #initialize() {
                sessionStorage.setItem("score", "");
        }

        #saveScore() {
                sessionStorage.setItem("score", this.#stats.toJsonString());
        }

        setGameModeOptions(gameModeOptions) {
                this.#gameModeOptions = gameModeOptions;
        }



        setFixedNumOfProblems(NumOfProblems) {
                if (!this.#game) {
                        this.#game = async () => {
                                const stopwatch = new Stopwatch();
                                stopwatch.start();
                                for (let problemNum = 1 ; problemNum <= NumOfProblems; problemNum++) {

                                        const problemProp = getNextProblemProp(problemNum, this.#gameModeOptions);
                                        const currentProblem = generateProblem(problemProp);
                                        await handleGameDisplay(problemNum, currentProblem);

                                        const timeTaken = stopwatch.lap();
                                        const point = new StatPoint(problemProp, currentProblem.problem, timeTaken)
                                        this.#stats.addPoint(point);

                                }
                                console.log(stopwatch.stop());
                        }
                } else {
                        this.#gameSetError();

                }
        }

        setProblemsWithCountDown() {
                this.#game = async () => {
                        const reductionRate = 0.95;
                        let currentTime = 60; // also initial time

                        const reduceTime = () => { currentTime = currentTime * reductionRate }; 
			const onTimeout = () => { this.endGame() };

                        for (let problemNum = 1;;problemNum++) {

                                const timer = new Timer(currentTime * 1000, reduceTime, onTimeout);
                                timer.start();

                                const problemProp = getNextProblemProp(problemNum, this.#gameModeOptions);
                                const currentProblem = generateProblem(problemProp);
                                await handleGameDisplay(problemNum, currentProblem);

                                const timeTaken = timer.cancel();
                                const point = new StatPoint(problemProp, currentProblem.problem, timeTaken)
                                this.#stats.addPoint(point);
                        }
                }

        }

        endGame() {
                this.#saveScore();
		window.location.href = window.location.origin + "/game_mode/game-over.html";
        }

        static handleGameOptions(gameMode, gameModeOptions) {
                const newGame = new Game();
                newGame.setGameModeOptions(gameModeOptions);
                switch (gameMode) {
                        case "casual":
                                const CASUAL_MODE_ITERATIONS = 40;
                                newGame.setFixedNumOfProblems(CASUAL_MODE_ITERATIONS);
                                break;

                        case "quick":
                                const QUICK_MODE_ITERATIONS = 5;
                                newGame.setFixedNumOfProblems(QUICK_MODE_ITERATIONS);
                                break;
                        case "countdown":
                                newGame.setProblemsWithCountDown();
                                break;
                }
                return newGame;
        }

        async play() {
                this.#initialize();
                if (this.game && this.#gameModeOptions) {
                        await this.game();
			this.endGame();
                } else {
                        throw new Error("Game Mode options and game type must be set");
                }
        }

        score() {
                // return stats
                return this.#stats
        }
}

const game = Game.handleGameOptions(gameMode, gameModeOptions);
game.play();
