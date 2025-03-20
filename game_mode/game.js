import { maxFromDigits, randNum, randomSumProblem } from './mentalMathProblems.js';


const QUICK_MODE_ITERATIONS = 5;

const params = new URLSearchParams(window.location.search);
const options = JSON.parse(params.get("options"));

/*
function checkForCorrectAnswer(correctAnswer) {
	document.getElementById("answer").addEventListener("input", 

}
*/

for (let problemNum = 1 ; problemNum <= QUICK_MODE_ITERATIONS; problemNum++) {

	for (const optionJson of options) {
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
			document.getElementById("problem").innerHTML = currentProblem.problem;
			document.getElementById("answer").innerHTML = currentProblem.answer();
		}
		problemNum++;
	}
}

