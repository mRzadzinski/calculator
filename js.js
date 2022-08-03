// values[0] - total
// values[1] - operator
// values[2] - current value
let values = [ , , 0];
const display = document.querySelector('#display');

// Numbers
const yellowButtons = document.querySelectorAll('.yellow');
yellowButtons.forEach(button => button.addEventListener('click', (e) => {
    if (display.textContent.length === 11) return;
    if (isNaN(display.textContent)) return;
    if (display.textContent == 0) display.textContent = '';
    if (values[2] === null) display.textContent = '';

    // Remove whitespaces from HTML text
    let buttonValue = button.textContent.replace(/\s+/g, '');
    display.textContent += buttonValue;
    values[2] = +display.textContent;
    console.log(values);
}));

const dot = document.querySelector('#dot');
dot.addEventListener('click', (e) => {
    if (display.textContent.length > 9) return;
    if (display.textContent.includes('.')) return;

    let dotValue = dot.textContent.replace(/\s+/g, '');
    display.textContent += dotValue;
});

// Clear, backspace
const redButtons = document.querySelectorAll('.red');
redButtons.forEach(button => button.addEventListener('click', (e) => {
    if (button.textContent.includes('AC')) clear();
    if (button.textContent.includes('Del')) backspace();
}));
// Inverse
const inverseButton = document.querySelector('#inverse');
inverseButton.addEventListener('click', (e) => inverse());

// Math operations
const orangeButtons = document.querySelectorAll('.orange');
orangeButtons.forEach(button => button.addEventListener('click', (e) => {
    if (isNaN(display.innerText)) return;

    // Save operator in variable
    values[1] = button.textContent.replace(/\s+/g, '');

    // If total is empty, move current value to total
    if (isNaN(values[0])) {
        values[0] = values[2];
        values[2] = null;
    }
    console.log(values);
}));

const equality = document.querySelector('#equality');
equality.addEventListener('click', (e) => {
    if (!values[1]) return;

    let result;

    if (values[2] == null) {
        result = operate(values[1], values[0], values[0]);
    } else {
        result = operate(values[1], values[0], values[2]);
    }
    
    if (isNaN(result)) {
        return;
    } else if (String(result).length  > 11) {
        display.innerText = 'Infinity';
        return;
    }
    values[0] = result;
    display.innerText = result;
    console.log(result);
    console.log(values);

});

function operate(operator, a, b) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === 'x') return multiply(a, b);
    if (operator === '/') return divide(a, b);
}

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
    if (b === 0) {
        clear();
        display.innerText = 'Error';
        return 'Error';
    }
    return a / b;
}

function inverse() {
    if (isNaN(display.innerText)) return;
    display.innerText = +display.innerText * (-1);
}

function clear() {
    values = [ , , 0];
    display.innerHTML = '0';
}

function backspace() {
    if (isNaN(display.textContent) || Infinity) clear();
    if (display.textContent.length === 1) {
        display.textContent = 0;
        return;
    }
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
}