// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// assign functions to const variable
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    // the + converts lengthEl.value into a number, otherwise it will be a string type
    const hasLower = lowercaseEl.checked;
    // checked will return a bool
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // pass into a function that will generate the password
    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    
    // if there is no password, do nothing
    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Initialize password variable
    // 2. Filter out unchecked types
    // 3. Loop over length call generator function for each type
    // 4. Add final pw to the pw variable and return

    // assign password to let variable, initialize as empty string
    let generatedPassword = '';

    // count how many character types are included in the password
    const typesCount = lower + upper + number + symbol;

    // assign the types count to an array, wrap each array item in curly braces so each type is assigned a bool value, then filter out any with a false value
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
    (
        item => Object.values(item)[0]
        );
    
    // if no character types are selected, do nothing
    if(typesCount === 0) {
        return '';
    }

    // loop through check item types in the array and append them to the generated password, loop range is the specified length
    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    // slice off any characters that make the password longer than the specified length

    return finalPassword;
    
}

// Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);

    // Math.random generates a random float, math.floor converts it into an int, the * 26 is a range, the 97 is added to make the number math the character code set (a = 97, lowercase alphabet starts at 97), the function is returning the string value associated with the CharCode int
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    // Same code as getting random lowercase letter, except the uppercase alphabet starts at A = 65
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);

    // Again, same code as generating random letters, except the range is all decimal numbers instead of letters in the alphabet, so we replace the 26 with 10 (representing 0 -9) and we add 48, because 0 = 48 in the CharCode
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()<>/,.';
    
    // assign a string with any symbols you want to be included to a const variable

    return symbols[Math.floor(Math.random() * symbols.length)];

    // use Math.floor(Math.random()) to generate a random int that will be the index of the symbol string, making the range the length of the symbol string
}