export function rangeOfNums(start, stop) {
	return Array.from({length: stop - start}, (value, index) => start + index);
}

