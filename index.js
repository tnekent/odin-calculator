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

function operate(operator, num1, num2) {
    let operationFunc;
    switch (operator) {
        case "+":
            operationFunc = add;
            break;
        case "-":
            operationFunc = subtract;
            break;
        case "*":
            operationFunc = multiply;
            break;
        case "/":
            operationFunc = divide;
            break;
    }

    return operationFunc(num1, num2);
}

function getCalcResult() {
    const firstNumber = Number(firstNumberString);
    const secondNumber = Number(secondNumberString);
    const result = operate(operationToDo, firstNumber, secondNumber);
    // Reconverting to number removes the trailing zeroes
    // present after toFixed even if result
    // is an integer
    return Number(result.toFixed(10));
}

let firstNumberString = "";
let secondNumberString = "";
let operationToDo;

const calcDisplay = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".btn-num");
numberButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const number = e.target.textContent;
        if (!operationToDo) {
            if (secondNumberString) {
                firstNumberString = "";
                secondNumberString = "";
            }
            firstNumberString += number;
            calcDisplay.textContent = firstNumberString;
        } else {
            secondNumberString += number;
            calcDisplay.textContent = secondNumberString;
        }
    })
})

const operationButtons = document.querySelectorAll(".btn-op");
operationButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        if (secondNumberString) {
            const result = getCalcResult();
            firstNumberString = result.toString();
            calcDisplay.textContent = firstNumberString;
            secondNumberString = "";
        }
        operationToDo = e.target.textContent;
    })
})

const equalsButton = document.querySelector(".btn-equals");
equalsButton.addEventListener("click", e => {
    if (!secondNumberString) {
        // Do nothing
        return;
    }
    const operationResult = getCalcResult();
    calcDisplay.textContent = operationResult;
    firstNumberString = "";
    secondNumberString = "";
    operationToDo = null;
})

const clearButton = document.querySelector(".btn-clr");
clearButton.addEventListener("click", e => {
    firstNumberString = "";
    secondNumberString = "";
    operationToDo = null;
    calcDisplay.textContent = "";
})