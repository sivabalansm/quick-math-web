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

export function renderProblem(numArray) {
	clearNums();
	appendNumsFromArray(numArray);
}

export function renderProblemNum(num) {
	document.getElementById("problem-number").innerHTML = num;
}

export function renderChart(problemType, chart) {
	const chartSectionForProblemType = document.getElementById(problemType);
	const newChartCtx = document.createElement("canvas");
	chartSectionForProblemType.appendChild(newChartCtx);
	new Chart(newChartCtx, chart); 
}
