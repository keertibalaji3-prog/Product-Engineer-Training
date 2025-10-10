"use strict";
let display = document.getElementById('display');
let currentVal = '0';
let previousVal = '';
let operator = '';
let waitingForOperand = false;
function updateDis() {
    if (display) {
        display.textContent = currentVal;
    }
}
function appendNumber(num) {
    if (waitingForOperand) {
        currentVal = num;
        waitingForOperand = false;
    }
    else {
        currentVal = currentVal === '0' ? num : currentVal + num;
    }
    updateDis();
}
function setOperator(op) {
    if (operator && !waitingForOperand) {
        calculate();
    }
    previousVal = currentVal;
    operator = op;
    waitingForOperand = true;
}
function calculate() {
    if (!operator || waitingForOperand)
        return;
    const previous = parseFloat(previousVal);
    const curr = parseFloat(currentVal);
    let result = 0;
    switch (operator) {
        case '+':
            result = previous + curr;
            break;
        case '-':
            result = previous - curr;
            break;
        case '*':
            result = previous * curr;
            break;
        case '/':
            result = previous / curr;
            break;
    }
    currentVal = String(result);
    operator = '';
    waitingForOperand = true;
    updateDis();
}
function clearDisplay() {
    currentVal = '0';
    previousVal = '';
    operator = '';
    waitingForOperand = false;
    updateDis();
}
//# sourceMappingURL=calculator.js.map