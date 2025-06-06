// Random num generator with min and max
export function randNum(min, max) {
  
  if (!(max > min && max > 0 && min >= 0))
    throw new Error('Max must be greater than min and both of them must be greater than 0');
  const range = max - min;
  
  return min + Math.round((Math.random() * range));
}

export function maxFromDigits(digits) {
	return ((10 ** digits) - 1);
}

export function minFromDigits(digits) {
	return (10 ** (digits - 1));
}
