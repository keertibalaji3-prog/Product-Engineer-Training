let display: HTMLElement | null = document.getElementById('display');
let currentVal: string = '0';
let previousVal: string = '';
let operator: string = '';
let waitingForOperand: boolean = false;

function updateDis(): void {
  if (display) {
    display.textContent = currentVal;
  }
}

function appendNumber(num: string): void {
  if (waitingForOperand) {
    currentVal = num;
    waitingForOperand = false;
  } else {
    currentVal = currentVal === '0' ? num : currentVal + num;
  }
  updateDis();
}

function setOperator(op: string): void {
  if (operator && !waitingForOperand) {
    calculate();
  }
  previousVal = currentVal;
  operator = op;
  waitingForOperand = true;
}

function calculate(): void {
  if (!operator || waitingForOperand) return;
  const previous: number = parseFloat(previousVal);
  const curr: number = parseFloat(currentVal);
  let result: number = 0;

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

function clearDisplay(): void {
  currentVal = '0';
  previousVal = '';
  operator = '';
  waitingForOperand = false;
  updateDis();
}