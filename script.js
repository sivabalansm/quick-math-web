import { randNum, randomSumProblem } from './mentalMathProblems.js';

let options = document.getElementsByClassName('option');

/*
function toggleHide(element) {
  if (element.style.display != "none") {
    elememt.style.display = "none";
  } else {
    element.style.display = "block";
  }
}
*/
function matchCheckToRangeToggle(checkboxElement, display) {
  switch (checkboxElement.name) {
    case 'sums':
      document.getElementById('sums-customize').style.display = display;
      break;
    case 'mult':
      document.getElementById('mult-customize').style.display = display;
      break;
    case 'div':
      document.getElementById('div-customize').style.display = display;
      break;
      
  }
}
for (const optionElementCheckbox of options) {
  optionElementCheckbox.addEventListener('change', function() {
    if (optionElementCheckbox.checked) {
      matchCheckToRangeToggle(optionElementCheckbox, 'block')
    } else {
    matchCheckToRangeToggle(optionElementCheckbox, 'none')
    }
  });

if (optionElementCheckbox.checked) {
    matchCheckToRangeToggle(optionElementCheckbox, 'block');
}
  else {
    matchCheckToRangeToggle(optionElementCheckbox, 'none');
  }
}