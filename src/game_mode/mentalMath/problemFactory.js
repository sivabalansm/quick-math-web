export class ProblemMaker {
  #problem;
  #problemType;
  constructor(problem, problemType) {
    this.#problem = problem;
    this.#problemType = problemType;
  }
  
  get problem() {
    if (this.#problemType == "m")
	  return this.#problem.sort((a, b) => { return b - a }) // reversed sort for multiplication, easier to read and compute for the user
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
