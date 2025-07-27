// ----- Math Functions -----
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
  a = Number(a);
  b = Number(b);

  if (operator === "/" && b === 0) {
    return "Really? Dividing by zero? Nope!";
  }

  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      return "Invalid operator";
  }

  // Round float to 5 decimal places if needed
  if (typeof result === "number" && !Number.isInteger(result)) {
    result = parseFloat(result.toFixed(5));
  }

  return result;
}

// ----- DOM Elements -----
const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons-container button");
const decimalBtn = document.getElementById("decimal-btn");

// ----- Calculator State -----
let firstNum = null;
let operator = null;
let secondNum = null;
let currentInput = "";
let waitingForSecondNum = false;
let lastResultDisplayed = false;

// ----- Helper Functions -----
function updateDecimalButton() {
  decimalBtn.disabled = currentInput.includes(".");
}

function clearCalculator() {
  firstNum = null;
  operator = null;
  secondNum = null;
  currentInput = "";
  waitingForSecondNum = false;
  lastResultDisplayed = false;
  updateDisplay("0");
  updateDecimalButton();
}

function resetInternalState() {
  firstNum = null;
  operator = null;
  secondNum = null;
  currentInput = "";
  waitingForSecondNum = false;
  lastResultDisplayed = false;
  updateDecimalButton();
}

function formatResult(result) {
  if (typeof result === "number") {
    if (!Number.isFinite(result)) return "Error";

    // Use scientific notation if too large
    if (Math.abs(result) >= 1e12) {
      return result.toExponential(5);
    }

    return result.toString();
  }

  return result; // for strings like error messages
}

function updateDisplay(value) {
  display.textContent = formatResult(value);
}

function inputDigit(digit) {
  if (lastResultDisplayed && !waitingForSecondNum) {
    currentInput = digit === "." ? "0." : digit;
    firstNum = null;
    lastResultDisplayed = false;
  } else {
    if (digit === "." && currentInput.includes(".")) return;
    currentInput += digit;
  }
  updateDisplay(currentInput);
  updateDecimalButton();
}

function inputOperator(op) {
  if (operator && currentInput === "") {
    operator = op; // allow operator change mid-input
    return;
  }

  if (currentInput === "") return;

  if (firstNum === null) {
    firstNum = parseFloat(currentInput);
  } else {
    secondNum = parseFloat(currentInput);
    if (isNaN(secondNum)) return;

    const result = operate(firstNum, operator, secondNum);
    if (typeof result === "string") {
      updateDisplay(result);
      resetInternalState(); // keep display
      return;
    }

    firstNum = result;
    updateDisplay(result);
  }

  operator = op;
  currentInput = "";
  waitingForSecondNum = true;
  lastResultDisplayed = false;
  updateDecimalButton();
}

function inputEquals() {
  if (firstNum === null || operator === null || currentInput === "") {
    updateDisplay("Incomplete!");
    return;
  }

  secondNum = parseFloat(currentInput);
  if (isNaN(secondNum)) {
    updateDisplay("Invalid input");
    return;
  }

  const result = operate(firstNum, operator, secondNum);
  if (typeof result === "string") {
    updateDisplay(result);
    resetInternalState();
    return;
  }

  updateDisplay(result);
  firstNum = result;
  operator = null;
  secondNum = null;
  currentInput = "";
  waitingForSecondNum = false;
  lastResultDisplayed = true;
  updateDecimalButton();
}

function inputBackspace() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
    updateDecimalButton();
  }
}

// ----- Button Clicks -----
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "Clear") {
      clearCalculator();
    } else if (value === "Backspace") {
      inputBackspace();
    } else if (["+", "-", "*", "/"].includes(value)) {
      inputOperator(value);
    } else if (value === "=") {
      inputEquals();
    } else if ((value >= "0" && value <= "9") || value === ".") {
      inputDigit(value);
    }
  });
});

// ----- Keyboard Support -----
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key >= "0" && key <= "9") {
    inputDigit(key);
  } else if (key === ".") {
    inputDigit(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    inputOperator(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault(); // prevent form submission
    inputEquals();
  } else if (key === "Backspace") {
    inputBackspace();
  } else if (key.toLowerCase() === "c") {
    clearCalculator();
  }
});
