
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
