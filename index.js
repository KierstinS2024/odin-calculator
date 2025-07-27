function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(a, operator, b) {
  let result;

  if (operator === "+") {
    result = add(a, b);
  } else if (operator === "-") {
    result = subtract(a, b);
  } else if (operator === "*") {
    result = multiply(a, b);
  } else if (operator === "/") {
    if (b === 0) return "Can't divide by 0!";
    result = divide(a, b);
  } else {
    alert("Please use +, -, /, or *");
    return null;
  }

  // Round result to avoid long decimals
  return Math.round(result * 100000) / 100000;
}

// DOM references
const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons-container button");

// State variables
let firstNum = null;
let operator = null;
let secondNum = null;
let waitingForSecondNum = false;
let currentInput = "";

// Button handler
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnValue = button.textContent;

    // Clear button
    if (btnValue === "Clear") {
      firstNum = null;
      operator = null;
      secondNum = null;
      waitingForSecondNum = false;
      currentInput = "";
      display.textContent = "0";
      return;
    }

    // Number or decimal
    if ((btnValue >= "0" && btnValue <= "9") || btnValue === ".") {
      if (btnValue === "." && currentInput.includes(".")) return;

      // Reset after a result if starting a new input
      if (!waitingForSecondNum && firstNum !== null && operator === null) {
        currentInput = btnValue;
        firstNum = null;
        display.textContent = currentInput;
        return;
      }

      currentInput += btnValue;
      display.textContent = currentInput;
      return;
    }

    // Operator
    if (["+", "-", "*", "/"].includes(btnValue)) {
      if (operator && currentInput !== "") {
        secondNum = parseFloat(currentInput);
        if (!isNaN(secondNum)) {
          const result = operate(firstNum, operator, secondNum);
          if (result === "Can't divide by 0!") {
            display.textContent = result;
            firstNum = null;
            operator = null;
            currentInput = "";
            waitingForSecondNum = false;
            return;
          }

          firstNum = result;
          display.textContent = String(result);
        }
      } else if (firstNum === null && currentInput !== "") {
        firstNum = parseFloat(currentInput);
      }

      operator = btnValue;
      currentInput = "";
      waitingForSecondNum = true;
      return;
    }

    // Equals
    if (btnValue === "=") {
      if (operator === null || currentInput === "") return;

      secondNum = parseFloat(currentInput);
      if (isNaN(secondNum)) return;

      const result = operate(firstNum, operator, secondNum);
      display.textContent = String(result);

      firstNum = result;
      operator = null;
      secondNum = null;
      currentInput = "";
      waitingForSecondNum = false;
    }
  });
});
