import { randNum, randomSumProblem } from './mentalMathProblems.js';


class Options {
  #type;
  #option1;
  #option2;
  constructor(type, option1, option2) {
    this.type = type;
    this.option1 = option1;
    this.option2 = option2;
  }

  json() {
    return {
      "type": this.type,
      "option1": this.option1,
      "option2": this.option2,
    };
  }
}

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

function matchCheckToRangeValue(checkboxElement) {
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

// Link checkbox to sliders, hide and show
let options = document.getElementsByClassName('option');

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

// Set output of sliders and event listeners 
let sliders = document.querySelectorAll("input[type=range]");

for (const slider of sliders ) {
  
   slider.nextElementSibling.value = slider.value;

  slider.addEventListener("input", function() {
  slider.nextElementSibling.value = slider.value;
  });
}

// Start Game
function getOptions() {
	;
}

function getGameMode() {
  ;
}

function startGame() {

}

