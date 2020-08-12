function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    if (operator == "+") {
        return add(num1, num2);
    }
    else if (operator == "-") {
        return subtract(num1, num2);
    }
    else if (operator == "x") {
        return multiply(num1, num2);
    }
    else if (operator == "÷") {
        return divide(num1, num2);
    }
}

function parseInput(str) {
    // Checks if the string is in the right format (ex. 9.33 - 9 ÷ 9.33 x 9)
    let testArr = str.match(/[0-9]+[\.]?[0-9]*([-+x÷]{1}[0-9]+[\.]?[0-9]*)+/g);

    // Match should only return 1 result if the format is correct
    if (!testArr || (testArr.length > 1) || (testArr[0] !== str)) {
        console.table(testArr);
        return 'Syntax error!';
    }

    // Retrieves array of number operands
    let numbers = str.split(/[-+x÷]/);

    // Retrieves array of operators
    let operators = str.split(/[0-9.]+/).join('').split('');

    // TESTING
    console.table(numbers);
    console.table(operators);

    // Holds current result
    let result = 0;

    for (let i = 0; i < operators.length; i++) {

        // Check for division by 0
        if (operators[i] == '÷' && numbers[i + 1] == '0') {
            return 'No division by zero!';
        }

        // Only run on first iteration
        if (i == 0) {
            if ((numbers[i].search(/[.]/) != -1) || (numbers[i + 1].search(/[.]/) != -1)) {
                console.log('float');
                result = operate(parseFloat(numbers[i]), operators[i], parseFloat(numbers[i + 1]));
            }
            else {
                console.log('int');
                result = operate(parseInt(numbers[i]), operators[i], parseInt(numbers[i + 1]));
            }
        }
        // Run rest of iterations
        else {
            if (numbers[i + 1].search(/[.]/) != -1) {
                console.log('float');
                result = operate(result, operators[i], parseFloat(numbers[i + 1]));
            }
            else {
                console.log('int');
                result = operate(result, operators[i], parseInt(numbers[i + 1]));
            }
        }
    }

    return result;
}

const input = document.querySelector('#input');
const answer = document.querySelector('#answer');
const displayables = document.querySelectorAll('.displayables');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const ans = document.querySelector('#ans');
const equal = document.querySelector('#equal');

// Adds operands and operators onto screen after their own button has been clicked
displayables.forEach((elem) => elem.addEventListener('click', (e) => {
    input.textContent += elem.textContent;
}));

// Clears calculator screen
clear.addEventListener('click', (e) => {
    input.textContent = '';
    answer.textContent = '';
});

// User can undo if they click the wrong number
backspace.addEventListener('click', (e) => {

    if (input.textContent.length <= 1) {
        input.textContent = '';
    }
    else {
        input.textContent = input.textContent.slice(0, input.textContent.length - 1);
    }
});

// User can use answer from prev operation onto next operation
ans.addEventListener('click', (e) => {
    if (answer.textContent == '') {
        return;
    }
    else {
        input.textContent = answer.textContent;
        answer.textContent = '';
    }
})

// Runs calculation
equal.addEventListener('click', (e) => {
    answer.textContent = parseInput(input.textContent);
});