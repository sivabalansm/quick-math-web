
export class StatPoint {
	// gameModeOption: { type: ..., option1: ..., option2: ... }
	// problem: [...nums]
	// time: seconds
	problem;
	time;
	gameModeOption;

	#getDigitsFromNum(num) {
		return Math.floor(Math.log10(Math.abs(num)) + 1);
	}

	#decomposeNum(num) {
		let decomp = [];
		let exp = 0;
		while (num > 0) {
			decomp.push((num % 10) * (10 ** exp));
			num = Math.floor(num / 10);
			exp++;
		}
		return decomp;
	}

	#individualDigits(num) {
		const decompNum = this.#decomposeNum(num);
		for (let i = 0; i < decompNum.length; i++) {
			decompNum[i] = parseInt(decompNum[i].toString()[0]);
		}
		return decompNum;
	}


        constructor(gameModeOption, problem, time) {
		this.gameModeOption = gameModeOption;
		this.problem = problem;
		this.time = time;
        }

	// getters
	get type() {
		return this.gameModeOption.type;
	}

	get time() {
		return this.time;
	}

        problemPerSec() {
                return 1/time;
        }

	digitPerSec() {
		let totalDigits = 0;
		switch(this.gameModeOption.type) {
			case 'sums':
				// digit count divided by time
				for (const num of this.problem) {
					totalDigits += this.#getDigitsFromNum(num);
				}
				break;

			case 'mult': { 
				const firstNum = this.problem[0];
				const secondNum = this.problem[1];
                                console.log(firstNum, secondNum);
				
				const firstNumDigits = this.#getDigitsFromNum(firstNum);
				const secondNumDigits = this.#getDigitsFromNum(secondNum);

				const everyMutlisADigitProcessed = firstNumDigits * secondNumDigits;

				const decompSecondNum = this.#decomposeNum(secondNum);

				// count digits
				totalDigits += everyMutlisADigitProcessed;
				for (const decompNum of decompSecondNum) {
                                        console.log("decompNum", decompNum);
					totalDigits += this.#getDigitsFromNum(decompNum * firstNum);
				}
                                console.log("Mult total digits", totalDigits);
				break;
                        }

			case 'div': {
				const firstNum = this.problem[0];
				const secondNum = this.problem[1];
				const answer = firstNum / secondNum;
				const numberOfMults = this.#getDigitsFromNum(answer);

				totalDigits += numberOfMults;
				
				const individualDigitsAnswer = this.#individualDigits(answer);

				for (const answerDigit of individualDigitsAnswer) {
					totalDigits += this.#getDigitsFromNum(answerDigit * secondNum);
				}
				break;
                        }
		}
		return totalDigits/this.time;
	}

}
export class Stats {
        pointList = { 'sums' : [], 'mult' : [], 'div' : [] };

        // getters
        get pointList() {
                return this.pointList;

        }

        constructor(pointList = this.pointList) {
		this.pointList = pointList;
        }

        addPoint(point) {
                this.pointList[point.type].push(point);
        }

        mean() {
		const pointToDigitsPerSec = (num) => num.digitPerSec();
		const average = (category) => ((pointList[category].map(pointToDigitsPerSec)).reduce((a, b) => a + b) / pointList[category].length)
		return { 'sums' : average['sums'], 'mult' : average['mult'], 'div': average['div'] };
        }

        toJsonString() {
		return JSON.stringify(this);
        }

        static fromJsonString(jsonString) {
		return new Stats(JSON.parse(json));
        }

}
