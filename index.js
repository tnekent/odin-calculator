let operator;
const operands = {
    first: "",
    second: "",
    currentOperandKey: "first",
}
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
    const firstNumber = Number(operands.first);
    const secondNumber = Number(operands.second);
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
    operands.first = "";
    operands.second = "";
    operands.currentOperandKey = "first";
    operator = null;
    usedDecPoint = false;
}

const calcDisplay = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".btn-num");
numberButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        const number = e.target.textContent;
        const opKey = operands.currentOperandKey;
        operands[opKey] += number;
        calcDisplay.textContent = operands[opKey];

    })
})

const operationButtons = document.querySelectorAll(".btn-op");
operationButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        if (!operands.first) {
            // If user hasn't typed a number as the first operand yet,
            // then clicking an operator should do nothing.
            return;
        }
        // Entering the second operand and then choosing an operator,
        // we enter this case where we immediately get a result, show
        // that result and set the result as the first operand for
        // the next operation.
        if (operands.second) {
            const result = getCalcResult();
            if (!error) {
                operands.first = result.toString();
                calcDisplay.textContent = operands.first;
                operands.second = "";
            } else {
                showErrorAndReset();
            }
        }
        operands.currentOperandKey = "second";
        operator = e.target.textContent;
        usedDecPoint = false;
    })
})

const equalsButton = document.querySelector(".btn-equals");
equalsButton.addEventListener("click", e => {
    if (!operands.second) {
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
    const opKey = operands.currentOperandKey;
    operands[opKey] += ".";
    calcDisplay.textContent = operands[opKey];
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