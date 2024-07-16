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
    switch (operate) {
        case "add":
            operationFunc = add;
            break;
        case "subtract":
            operationFunc = subtract;
            break;
        case "multiply":
            operationFunc = multiply;
            break;
        case "divide":
            operationFunc = divide;
            break;
    }

    return operationFunc(num1, num2);
}

let operationToDo;

const calcDisplay = document.querySelector("#calc-display");
const numberButtons = document.querySelectorAll(".btn-num");
numberButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        calcDisplay.textContent += e.target.textContent;
    })
})

const operationButtons = document.querySelectorAll(".btn-op");
operationButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        operationToDo = e.target.textContent;
        console.log(operationToDo)
    })
})