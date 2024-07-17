let firstOperand = "";
let secondOperand = "";
let operator;

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
    const firstNumber = Number(firstOperand);
    const secondNumber = Number(secondOperand);
    const result = operate(operator, firstNumber, secondNumber);
    // Reconverting to number removes the trailing zeroes
    // present after toFixed even if result
    // is an integer
    return Number(result.toFixed(10));
}

function resetOperationVariables() {
    firstOperand = "";
    secondOperand = "";
    operator = null;
}

const calcDisplay = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".btn-num");
numberButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const number = e.target.textContent;
        if (!operator) {
            if (secondOperand) {
                firstOperand = "";
                secondOperand = "";
            }
            firstOperand += number;
            calcDisplay.textContent = firstOperand;
        } else {
            secondOperand += number;
            calcDisplay.textContent = secondOperand;
        }
    })
})

const operationButtons = document.querySelectorAll(".btn-op");
operationButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        if(!firstOperand) {
            // If user hasn't typed a number as the first operand yet,
            // then clicking an operator should do nothing.
            return;
        }
        if (secondOperand) {
            const result = getCalcResult();
            firstOperand = result.toString();
            calcDisplay.textContent = firstOperand;
            secondOperand = "";
        }
        operator = e.target.textContent;
    })
})

const equalsButton = document.querySelector(".btn-equals");
equalsButton.addEventListener("click", e => {
    if (!secondOperand) {
        // If user hasn't typed the second number,
        // then clicking equals should do nothing.
        return;
    }
    const operationResult = getCalcResult();
    calcDisplay.textContent = operationResult;
    resetOperationVariables();
})

const clearButton = document.querySelector(".btn-clr");
clearButton.addEventListener("click", e => {
    calcDisplay.textContent = "";
    resetOperationVariables();
})