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
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  } else {
    alert("Please use +, -, /, or *");
    return null;
  }
}

const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons-container button");

let firstNum = null;
let operator = null;
let secondNum = null;
let waitingForSecondNum = false;
let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const btnValue = button.textContent;

    // Clear button resets everything
    if (btnValue === "Clear") {
      firstNum = null;
      operator = null;
      secondNum = null;
      waitingForSecondNum = false;
      currentInput = "";
      display.textContent = "";
      return;
    }

    // Digit or decimal point input
    if ((btnValue >= "0" && btnValue <= "9") || btnValue === ".") {
      // Prevent multiple decimals in the current number
      if (btnValue === "." && currentInput.includes(".")) return;

      // If result was just shown and no operator set, start fresh input
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

    // Operator button (+, -, *, /)
    if (["+", "-", "*", "/"].includes(btnValue)) {
      // Change operator if operator is already set and waiting for second number
      if (operator && waitingForSecondNum) {
        operator = btnValue;
        return;
      }

      if (firstNum === null) {
        firstNum = parseFloat(currentInput);
      } else if (!waitingForSecondNum) {
        secondNum = parseFloat(currentInput);
        if (!isNaN(secondNum)) {
          const result = operate(firstNum, operator, secondNum);
          firstNum = result;
          display.textContent = String(result);
        }
      }

      operator = btnValue;
      waitingForSecondNum = true;
      currentInput = "";
      return;
    }

    // Equals button
    if (btnValue === "=") {
      if (operator === null || currentInput === "") {
        // Nothing to compute
        return;
      }

      secondNum = parseFloat(currentInput);
      if (isNaN(secondNum)) return;

      const result = operate(firstNum, operator, secondNum);
      display.textContent = String(result);

      // Reset state for next calculation
      firstNum = result;
      operator = null;
      waitingForSecondNum = false;
      currentInput = "";
      secondNum = null;
      return;
    }
  });
});
