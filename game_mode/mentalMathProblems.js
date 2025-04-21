

class ProblemMaker {
  #problem;
  #problemType;
  constructor(problem, problemType) {
    this.#problem = problem;
    this.#problemType = problemType;
  }
  
  get problem() {
    return this.#problem;
  }
  get answer() {
	  return this.getAnswer();
  }
  get problemType() {
    return this.#problemType;
  }
  
  // Sum of numbers in array
  static solveSum(arr) {
    if (arr.length > 0)
      return arr.reduce(function (total, new_addition) {
        return total + new_addition;
      });
    return 0;
  }
  
  static solveProduct(arr) {
    if (arr.length > 0)
      return arr.reduce(function (total, new_multiplication) {
        return total * new_multiplication;
      });
    return 0;
  }
  
  static solveDivison(arr) {
    if (arr.length > 0)
      return arr.reduce(function (total, new_division) {
        return total / new_division;
      });
    return 0;
  }
  
  getAnswer() {
    let problemAnswer = 0;
    switch (this.#problemType) {
      case "a":
      case "s":
          problemAnswer = ProblemMaker.solveSum(this.#problem);
          break;
      case "m":
          problemAnswer = ProblemMaker.solveProduct(this.#problem);
          break;
      case "d":
          problemAnswer = ProblemMaker.solveDivison(this.#problem);
          break;
       default:
          throw new Error("Unknown problemType: " + this.#problemType);
    }
    return problemAnswer;
  }
}


// Random num generator with min and max
function randNum(min, max) {
  
  if (!(max > min && max > 0 && min >= 0))
    throw new Error('Max must be greater than min and both of them must be greater than 0');
  const range = max - min;
  
  return min + Math.round((Math.random() * range));
}



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
	let mult = [randMultNum(firstNumDigits), randMultNum(secondNumDigits)].sort();
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


function maxFromDigits(digits) {
	return ((10 ** digits) - 1);
}

function minFromDigits(digits) {
	return (10 ** (digits - 1));
}

// Exports for other files
export { maxFromDigits, randNum, randomSumProblem, randomMultProblem, randomDivProblem };
