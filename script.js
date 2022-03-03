//get the elements from the html
let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let equalsButton = document.getElementById("equals");
let clearAllButton = document.getElementById("clear");
let backspaceButton = document.getElementById("backspace");
let previousValue = document.getElementById("history-value");
let currentValue = document.getElementById("output-value");

//create a calculator class
class Calculator {
  constructor(firstValue, secondValue) {
    this.firstValue = firstValue;
    this.secondValue = secondValue;
    this.clearInputs();
  }
  //clear all the inputs
  clearInputs() {
    this.firstValue = "";
    this.secondValue = "";
    this.operation = undefined;
  }
  //backspace
  deleteInputs(input) {
    this.firstValue = input.toString().slice(0, -1);
  }
  //concat the numbers each time they are pressed to form the first value
  displayNumber(number) {
    if (number === "." && this.firstValue.includes(".")) return;
    this.firstValue = this.firstValue.toString() + number.toString();
  }
  //if the first value is empty return nothing, if the second value isn't empty then continue computing
  chooseOperations(operation) {
    if (this.firstValue === "") return;
    if (this.secondValue !== "") {
      this.computeOperations();
    }
    this.operation = operation;
    //add the first value in the second value
    this.secondValue = this.firstValue;
    this.firstValue = "";
  }
  //switch operator
  computeOperations() {
    let computation;
    let firstNum = parseFloat(this.firstValue);
    let secondNum = parseFloat(this.secondValue);
    console.log(firstNum, secondNum);
    if (isNaN(secondNum) || isNaN(firstNum)) return;
    switch (this.operation) {
      case "+":
        computation = firstNum + secondNum;
        break;
      case "-":
        computation = firstNum - secondNum;
        break;
      case "*":
        computation = firstNum * secondNum;
        break;
      case "/":
        computation = firstNum / secondNum;
        break;
      default:
        return;
    }
    this.firstValue = Math.abs(computation);
    this.operation = undefined;
    this.secondValue = "";
  }
  //update the values on display
  updateDisplay() {
    currentValue.innerText = this.firstValue;
    if (this.operation != null) {
      previousValue.innerText = `${this.secondValue} ${this.operation}`;
    } else {
      previousValue.innerText = "";
    }
  }
}

let calculator = new Calculator(previousValue, currentValue);

//add an event listener to every operator, call the displayNumber func and add the innerText as a parameter
let numbers = numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.displayNumber(e.target.innerText);
    calculator.updateDisplay();
  });
});
//add an event listener to every operator, call the chooseOperations func and add the innerText as parameter
let operators = operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.chooseOperations(e.target.innerText);
    calculator.updateDisplay();
  });
});
//whenever the equals button is pressed return the computation that depends on which operator was pressed before
equalsButton.addEventListener("click", (e) => {
  calculator.computeOperations();
  previousValue.innerText = `${calculator.secondValue}`;
});
//clear all values
clearAllButton.addEventListener("click", () => {
  calculator.clearInputs();
  calculator.updateDisplay();
});
//backspace
backspaceButton.addEventListener("click", () => {
  calculator.deleteInputs(currentValue.innerText);
  calculator.updateDisplay();
});
