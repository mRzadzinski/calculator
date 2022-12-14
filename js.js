let total;
let operator;
let currentValue = 0;
let operatorClicked = false;
let equalityClicked = false;
const display = document.querySelector('#display');

// Typing numbers
const yellowButtons = document.querySelectorAll('.yellow');
yellowButtons.forEach(button => button.addEventListener('click', (e) => {
    // Max number length
    if (display.textContent.length >= 11 && currentValue) {
        return;
    }
    if (isNaN(display.textContent)) return;

    // Type new number
    if (!display.textContent.includes('.')) {
        if (operatorClicked || display.textContent == 0 || currentValue === undefined) {
            display.textContent = '';
            operatorClicked = false;
        }
    } else if (display.textContent.includes('.') && String(display.textContent).length > 1 && operator) {
        display.textContent = '';
        operatorClicked = false;
        console.log('check with dot');
    } 
    if (equalityClicked) {
        equalityClicked = false;
        clear();
        display.textContent = '';
        }

    // Modify total if total is defined, but operator and current are not
    if (total && operator === undefined && currentValue === undefined) {
        let buttonValue = button.textContent;
        display.textContent += buttonValue;
        total = +display.textContent;
        return;
    }
    let buttonValue = button.textContent;
    display.textContent += buttonValue;
    currentValue = +display.textContent;
    console.log(total, operator, currentValue);
}));

const dot = document.querySelector('#dot');
dot.addEventListener('click', (e) => {
    if (display.textContent.length > 9) return;
    if (display.textContent.includes('.')) return;

    let dotValue = dot.textContent;
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
    // Don't run equality when clicking operator if equality was just clicked
    if (operator && !isNaN(total) && !isNaN(currentValue) && equalityClicked === false) runEquality();
    
    equalityClicked = false;
    operatorClicked = true;
    operator = button.textContent;

    if (currentValue === undefined && total === undefined) return;

    // If total is empty, move current value to total
    if (total === undefined) {
        total = currentValue;
        currentValue = undefined;
    }
    console.log(total, operator, currentValue);
}));

const equality = document.querySelector('#equality');
equality.addEventListener('click', (e) => {
    if (!operator) return;
    equalityClicked = true;
    runEquality();
});

function runEquality() {
    let result;
    // '+' operator gets rid of unnecessary zeros at the end produced by toFixed()
    if (currentValue === undefined) {
        result = +operate(operator, total, total);
    } else {
        result = +operate(operator, total, currentValue);
    }
    if (isNaN(result)) return;

    result = +result.toFixed(9);
    //Prevent overflowing display
    if (String(result).length  > 9) {
        // Adjust position of floating point
        if (result < 999999999 && result > (-999999999)) {
            let resultInteger;
            if (result < 0) {
                resultInteger = String((Math.floor(result)) * (-1));
            } else {
                resultInteger = String((Math.floor(result)));
            }
            result = +result.toFixed(9 - (resultInteger.length));
        // Convert to exponential notation
        } else {
            result = result.toExponential(3);
        }
    }
    // Simplify result to avoid operations on negative exponents
    if (String(result).includes('e-')) {
        total = 0;
        display.innerText = 0;
    } else {
        total = +result;
        display.innerText = result;
    }
    console.log(total, operator, currentValue);
}

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
    if (isNaN(display.innerText) || display.innerText === Infinity || display.innerText.includes('e+')) return;
    // Inverse appropriate value
    if (+display.innerText === +currentValue) {
        display.innerText = +display.innerText * (-1);
        currentValue = +display.innerText;
    } else if (+display.innerText === +total) {
        display.innerText = +display.innerText * (-1);
        total = +display.innerText;
    }
}

function clear() {
    total = undefined;
    operator = undefined;
    currentValue = 0;
    display.innerHTML = '0';
}

function backspace() {
    if (isNaN(display.textContent) || display.textContent === Infinity || 
        String(display.textContent).includes('e+')) {
            clear();
        };
    if (display.textContent.length === 1) {
        display.textContent = 0;
        currentValue = 0;
        return;
    }

    if (equalityClicked === true || operatorClicked === true) {
        operator = undefined;
        currentValue = undefined;
        // Delete last number
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        total = +display.textContent;
        console.log(total, operator, currentValue);
        return;
    }

    // Delete last number
    display.textContent = display.textContent.substring(0, display.textContent.length - 1);

    if (currentValue === undefined) {
        total = +display.textContent;
        return;
    }
    currentValue = +display.textContent;
}

// Keys functionality
window.addEventListener('keydown', (e) => {
    if (e.code === 'Delete' || e.code === 'Escape') redButtons[0].click();
    if (e.key === '*' || e.code === 'KeyX') orangeButtons[1].click();
    if (e.key === '=' || e.code === 'Enter') equality.click();
    if (e.code === 'Backspace') redButtons[1].click();
    if (e.code === 'Digit1') yellowButtons[6].click();
    if (e.code === 'Digit2') yellowButtons[7].click();
    if (e.code === 'Digit3') yellowButtons[8].click();
    if (e.code === 'Digit4') yellowButtons[3].click();
    if (e.code === 'Digit5') yellowButtons[4].click();
    if (e.code === 'Digit6') yellowButtons[5].click();
    if (e.code === 'Digit7') yellowButtons[0].click();
    if (e.code === 'Digit9') yellowButtons[2].click();
    if (e.code === 'Digit0') yellowButtons[9].click();
    if (e.code === 'Slash') orangeButtons[0].click();
    if (e.key === '8') yellowButtons[1].click();
    if (e.key === '-') orangeButtons[2].click();
    if (e.key === '+') orangeButtons[3].click();
    if (e.key === '_') inverseButton.click();
    if (e.key === '.') dot.click();
});

// Remove focus from clicked element
const allElements = document.querySelectorAll('*');
allElements.forEach(element => element.addEventListener('click', (e) => (element.blur())));


