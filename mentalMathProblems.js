

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
  get problemType() {
    return this.#problemType;
  }
  
  // Sum of numbers in array
  static makeSum(arr) {
    if (arr.length > 0)
      return arr.reduce(function (total, new_addition) {
        return total + new_addition;
      });
    return 0;
  }
  
  static makeProduct(arr) {
    return arr.reduce(function (total, new_multiplication) {
      return total * new_multiplication;
    });
  }
  
  static makeDivison(arr) {
    return arr.reduce(function (total, new_division) {
      return total / new_division;
    });
  }
  
  make() {
    let answer = 0;
    switch (this.#problemType) {
      case "a":
      case "s":
          answer = ProblemMaker.makeSum(this.#problem);
          break;
      case "m":
          answer = ProblemMaker.makeProduct(this.#problem);
          break;
      case "d":
          answer = ProblemMaker.makeDivison(this.#problem);
          break;
       default:
          throw new Error("Unknown problemType: " + this.#problemType);
    }
    return answer;
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
    let sumOfNums = ProblemMaker.makeSum(sum);
    if (sumOfNums > 0 && isSubtraction && isCurrentlySubtraction) {
        newNum = -randNum(0, sumOfNums);
    } else {
        newNum = randNum(min, max);
    }
    sum.push(newNum)
  }
  return new ProblemMaker(sum, "s");
}



// Exports for other files
export { randNum, randomSumProblem };