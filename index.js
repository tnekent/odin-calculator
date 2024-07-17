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
        operationToDo = e.target.textContent;
    })
})

const equalsButton = document.querySelector(".btn-equals");
equalsButton.addEventListener("click", e => {
    if (!secondNumberString) {
        // Do nothing
        return;
    }
    const firstNumber = Number(firstNumberString);
    const secondNumber = Number(secondNumberString);
    const operationResult = operate(operationToDo, firstNumber, secondNumber);
    calcDisplay.textContent = operationResult;
    operationToDo = null;
})