import { ProblemMaker } from './problemFactory.js';
import { randNum, maxFromDigits, minFromDigits } from './mathUtils.js';

// New random Sum Problem 
function randomSumProblem(min, max, isSubtraction, size) {
  let sum = [];
  
  for (let numCount = 1; numCount <= size; numCount++) {
    let newNum = 0;
    let isCurrentlySubtraction = randNum(0, 1);
    let sumOfNums = ProblemMaker.solveSum(sum);
    if (sumOfNums > 0 && isSubtraction && isCurrentlySubtraction) {
        newNum = -randNum(0, sumOfNums);
    } else {
        newNum = randNum(min, max);
    }
    sum.push(newNum)
  }
  return new ProblemMaker(sum, "s");
}

function randomMultProblem(firstNumDigits, secondNumDigits) {
	const randMultNum = (digits) => {
		return randNum(minFromDigits(digits), maxFromDigits(digits));
	}
	let mult = [randMultNum(firstNumDigits), randMultNum(secondNumDigits)];
	return new ProblemMaker(mult, "m");
}

function randomDivProblem(firstNumDigits, secondNumDigits) {
	if (secondNumDigits > firstNumDigits) {
		// var swap
		let tmp = secondNumDigits;
		secondNumDigits = firstNumDigits;
		firstNumDigits = tmp;
	}
	const max = maxFromDigits(firstNumDigits);
	const min = minFromDigits(firstNumDigits);
	const secondNum = randNum(minFromDigits(secondNumDigits), maxFromDigits(secondNumDigits));
	const firstNum = randNum(Math.ceil(min / secondNum), Math.floor(max / secondNum)) * secondNum;

	let div = [firstNum, secondNum];
	return new ProblemMaker(div, "d");
}




// Exports for other files
export function generateProblem({ type, option1, option2 }) {
	switch (type) {
			case "sums":
				return randomSumProblem(0, maxFromDigits(option1), true, option2);
			case "mult":
				return randomMultProblem(option1, option2);
			case "div":
				return randomDivProblem(option1, option2);
			default:
				throw new Error("Problem type does not exist");
	}
}
