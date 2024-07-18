let firstOperand = "";
let secondOperand = "";
let operator;
let usedDecPoint = false;
let error = null;

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
    console.log(a, b)
    if (b === 0) {
        error = "NOOOOOOOOO";
        return null;
    }
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
    // present after toFixed even if result is an integer
    return !error ?
        Number(result.toFixed(10)) :
        null;
}

function showErrorAndReset() {
    calcDisplay.textContent = error;
    error = null;
    resetOperationVariables();
}

function resetOperationVariables() {
    firstOperand = "";
    secondOperand = "";
    operator = null;
    usedDecPoint = false;
}

const calcDisplay = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".btn-num");
numberButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const number = e.target.textContent;
        if (!operator) {
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
        if (!firstOperand) {
            // If user hasn't typed a number as the first operand yet,
            // then clicking an operator should do nothing.
            return;
        }
        // Entering the second operand and then choosing an operator,
        // we enter this case where we immediately get a result, show
        // that result and set the result as the first operand for
        // the next operation.
        if (secondOperand) {
            const result = getCalcResult();
            if (!error) {
                firstOperand = result.toString();
                calcDisplay.textContent = firstOperand;
                secondOperand = "";
            } else {
                showErrorAndReset();
            }
        }
        operator = e.target.textContent;
        usedDecPoint = false;
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
    if (!error) {
        calcDisplay.textContent = operationResult;
        resetOperationVariables();
    } else {
        showErrorAndReset();
    }
})

const clearButton = document.querySelector(".btn-clr");
clearButton.addEventListener("click", e => {
    calcDisplay.textContent = "";
    resetOperationVariables();
})

const decimalPointButton = document.querySelector(".btn-dec-point");
decimalPointButton.addEventListener("click", e => {
    if (usedDecPoint) {
        return;
    }
    if (!operator) {
        firstOperand += ".";
        calcDisplay.textContent = firstOperand;
    } else {
        secondOperand += ".";
        calcDisplay.textContent = secondOperand;
    }
    usedDecPoint = true;
})

const backspaceButton = document.querySelector(".btn-bck");
backspaceButton.addEventListener("click", e => {
    if (!operator) {
        if (!firstOperand) {
            return;
        }
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
        calcDisplay.textContent = firstOperand;
    } else {
        if (!secondOperand) {
            return;
        }
        secondOperand = secondOperand.slice(0, secondOperand.length - 1);
        calcDisplay.textContent = secondOperand;
    }
})