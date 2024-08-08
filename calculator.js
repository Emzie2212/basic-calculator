let result = document.getElementById("inputtext");

let solve = (character) => {
    if (character === 'C') {
        result.value = '';
    } else if (character === 'Del') {
        result.value = result.value.slice(0, -1);
    } else {
        result.value += character;
    }
}

let Result = () => {
    try {
        result.value = calculate(result.value);
    } catch (error) {
        result.value = 'Error';
    }
}

function calculate(expression) {
    let tokens = expression.split(/(\+|\-|\*|\/)/); // Split into numbers and operators

    // Convert number strings to actual numbers
    for (let i = 0; i < tokens.length; i++) {
        if (!isNaN(tokens[i])) {
            tokens[i] = parseFloat(tokens[i]);
        }
    }

    // Process multiplication and division
    tokens = processOperators(tokens, ['*', '/']);

    // Process addition and subtraction
    tokens = processOperators(tokens, ['+', '-']);

    return tokens[0];
}

function processOperators(tokens, operators) {
    for (let i = 0; i < tokens.length; i++) {
        if (operators.includes(tokens[i])) {
            let left = tokens[i - 1];
            let operator = tokens[i];
            let right = tokens[i + 1];

            let result;
            if (operator === '*') {
                result = left * right;
            } else if (operator === '/') {
                result = left / right;
            } else if (operator === '+') {
                result = left + right;
            } else if (operator === '-') {
                result = left - right;
            }

            // Replace the operator and its operands with the result
            tokens.splice(i - 1, 3, result);
            i--; // Adjust the index to account for the removed elements
        }
    }
    return tokens;
}
