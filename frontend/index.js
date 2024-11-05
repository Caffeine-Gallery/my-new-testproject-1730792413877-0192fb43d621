import { backend } from 'declarations/backend';

let currentValue = '';
let currentOperation = null;
let awaitingSecondOperand = false;

const display = document.getElementById('display');
const loading = document.getElementById('loading');

document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.op').forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent));
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clear);

function appendNumber(number) {
    if (awaitingSecondOperand) {
        display.value = number;
        awaitingSecondOperand = false;
    } else {
        display.value = display.value === '0' ? number : display.value + number;
    }
    currentValue = display.value;
}

function setOperation(op) {
    if (currentOperation !== null) calculate();
    currentOperation = op;
    awaitingSecondOperand = true;
}

async function calculate() {
    if (currentOperation === null || awaitingSecondOperand) return;

    loading.classList.remove('hidden');
    try {
        const result = await backend.calculate(parseFloat(currentValue), currentOperation, parseFloat(display.value));
        display.value = result.toString();
        currentValue = display.value;
        currentOperation = null;
    } catch (error) {
        display.value = 'Error';
    } finally {
        loading.classList.add('hidden');
    }
}

function clear() {
    display.value = '0';
    currentValue = '';
    currentOperation = null;
    awaitingSecondOperand = false;
}
