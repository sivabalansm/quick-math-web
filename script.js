class Options {
  #type;
  #option1;
  #option2;
  constructor(type = '', option1 = 0, option2 = 0) {
    this.#type = type;
    this.#option1 = option1;
    this.#option2 = option2;
  }
  set type(type) {
	  this.#type = type;
  }
  set option1(option1) {
	  this.#option1 = option1;
  }
  set option2(option2) {
	  this.#option2 = option2;
  }

  json() {
    if (this.#type && this.#option1 && this.#option2) 
      return {
        "type":    this.#type,
        "option1": this.#option1,
        "option2": this.#option2,
      };
    throw new Error("All type, option1, option2 must be set");
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
  let newOption = new Options();
  switch (checkboxElement.name) {
    case 'sums':
      newOption.type = 'sums';
      newOption.option1 = document.getElementById('sums-customize-digits').value;
      newOption.option2 = document.getElementById('sums-customize-size').value;
      break;
    case 'mult':
      newOption.type = 'mult';
      newOption.option1 = document.getElementById('mult-customize-first-digits').value;
      newOption.option2 = document.getElementById('mult-customize-second-digits').value;
      break;
    case 'div':
      newOption.type = 'div';
      newOption.option1 = document.getElementById('div-customize-first-digits').value;
      newOption.option2 = document.getElementById('div-customize-second-digits').value;
      break;
      
  }
  return newOption.json();
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
  let optionGameArr = [];
  for (const optionElementCheckbox of options) {
    if (optionElementCheckbox.checked) {
      optionGameArr.push(matchCheckToRangeValue(optionElementCheckbox));
    }
  }
  return optionGameArr;
}

function startGame() {
  let optionGameArr = getOptions();
  let encodedParamOtions = encodeURIComponent(JSON.stringify(optionGameArr));
  game_folder = "/game_mode/";
  param_name = "?options=";
  game_mode = "";
  // type of game
  if (document.getElementById("countdown").checked) {
	  game_mode = "countdown.html";

  } else if (document.getElementById("quick").checked) {
	  game_mode = "quick.html";

  } else {
	  game_mode = "casual.html";
  }
  window.location.href = game_folder + game_mode + param_name + encodedParamOtions;
}

