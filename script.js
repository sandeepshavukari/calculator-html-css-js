let currentInput = ''; // For storing the current number being typed
let previousInput = ''; // For storing the previous number (before an operator)
let operator = ''; // For storing the current operator

function appendNumber(number) {
    currentInput += number;
    updateScreen(currentInput);
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateScreen(previousInput + ' ' + operator);
}

function clearScreen() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateScreen('0');
}

function updateScreen(value) {
    document.getElementById('screen').textContent = value || '0';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateScreen(currentInput);
}

// Function to handle keyboard events
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Numbers (0-9)
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    // Operators (+, -, *, /)
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperation(key);
    }
    // Equals (= or Enter)
    else if (key === '=' || key === 'Enter') {
        calculate();
    }
    // Clear (C or Escape)
    else if (key === 'c' || key === 'C' || key === 'Escape') {
        clearScreen();
    }
    // Backspace (clear last digit)
    else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput || '0');
    }
});
