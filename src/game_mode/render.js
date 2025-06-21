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
	const containerForChart = document.createElement("div"); // chart auto responsivness potential fix?
	containerForChart.classList.add("chart-container");
	containerForChart.appendChild(newChartCtx);

	chartSectionForProblemType.appendChild(containerForChart);
	new Chart(newChartCtx, chart); 
}

// Resize charts when resizing the window (chartjs does not do this automatically)
export function handleResizeChartRender() {
	window.addEventListener("resize", (event) => {
		for (let id in Chart.instances) {
			Chart.instances[id].resize();
		}
	});
}

