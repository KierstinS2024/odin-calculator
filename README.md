# odin-calculator
# Introduction

You made it! By now you should have a really firm grasp on the fundamentals of JavaScript. Of course, there’s plenty more to learn, but you should be able to create quite a bit at this point. Our final project is going to combine everything you’ve learned so far: you’re going to make an on-screen calculator using JavaScript, HTML, and CSS.

As usual with these things, there are elements of this project that are not going to be trivial for you, but if you’ve been following the course so far, you definitely have everything you need to finish it. We’re going to walk you through the various steps you can take, but again, how you actually implement them is up to you!

---

## ⚠️ Warning

Before you get started with the project, we need to cover a word of warning. As you look into how to evaluate complex mathematical statements in JavaScript, you will likely come across the tantalizing `eval()` function. However, this function can be **very dangerous** and [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) does a good job documenting why you should never use `eval`!

You’ll need to build your own functions to evaluate expressions as part of this project. On the same note, when researching how to calculate expressions, you may encounter solutions that suggest returning a `new Function()` that evaluates a string. Similarly to `eval()`, this should **not be used** due to potential pitfalls of evaluating insecure data.

Besides, where’s the fun in solutions that do all the work for you? Let’s get to it!

---

# Assignment

> Don’t forget to commit early & often! You can reference the [Commit Messages](#) lesson here!

Here are some use cases (expectations about your project):

### ✅ Basic Requirements

- Your calculator should contain functions for all basic math operators. Start by creating and testing these in your browser console:
  - `add`
  - `subtract`
  - `multiply`
  - `divide`

- A calculator operation will consist of a number, an operator, and another number (e.g., `3 + 5`).  
  Create three variables, one for each part of the operation, to use for updating the display later.

- Create a new function `operate` that:
  - Takes an operator and two numbers.
  - Calls the appropriate function (from the four above) on the numbers.

- Create a **basic HTML calculator** layout:
  - Buttons for digits and operators (including `=`).
  - A display filled with dummy numbers for now.
  - A `clear` button.

- Implement digit button functionality:
  - When clicked, the digit should populate the display.
  - Store the number shown in a variable.

- Make the calculator **functional**:
  - Store the first and second number.
  - Call `operate()` when `=` is pressed.
  - Update the display with the result.

> 💡 This is the most challenging part — figuring out how to manage and store the values. Don’t get discouraged if it takes a while.

---

## 🐛 Gotchas (Edge Cases to Handle)

- **Single pair evaluations only**: Your calculator should not evaluate more than one pair at a time.
  
  Example:
  1. Enter `12`
  2. Press `+`
  3. Enter `7`
  4. Press `-` → Evaluate `12 + 7` and show `19`
  5. Enter `1`
  6. Press `=` → Evaluate `19 - 1`, show `18`

- **Round long decimals** so they don’t overflow the display.

- **Avoid early evaluations**:
  - Pressing `=` before both numbers and the operator are present should not evaluate anything.

- **Clear functionality**:
  - Pressing `clear` should reset everything.

- **Division by zero**:
  - Don’t let it crash!
  - Display a snarky error message.

- **Operator spamming**:
  - If multiple operators are pressed consecutively, do **not** evaluate.
  - Only the **last operator** should count.

- **New input after result**:
  - Pressing a digit after getting a result should **start fresh**, not append to the result.

---

## ⭐ Extra Credit

- **Decimal support**:
  - Add a `.` button for decimal input.
  - Prevent multiple decimals (e.g., `12.3.56.5` should not be allowed).
  - Disable the `.` button when a decimal already exists in the number.

- **Backspace button**:
  - Allow users to undo their last digit input.

- **Keyboard support**:
  - Enable full keyboard interaction with the calculator.

---

Happy coding! 🧮
