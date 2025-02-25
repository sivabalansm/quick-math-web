import { randNum, randomSumProblem } from './mentalMathProblems.js';



const params = new URLSearchParams(window.location.search);
const options = JSON.parse(params.get("options"));

for (const optionJson of options) {
	switch (optionJson.type) {
		case "sums":
			break;
		case "mult":
			break;
		case "div":
			break;
	}
}

