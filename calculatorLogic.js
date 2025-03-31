const calculatorButtons = {
    clearButton: 'C',
    percentageButton: '%',
    deleteButton: 'Del',
    divideButton: '/',
    numberSevenButton: '7',
    numberEightButton: '8',
    numberNineButton: '9',
    multiplyButton: '*',
    numberFourButton: '4',
    numberFiveButton: '5',
    numberSixButton: '6',
    substractionButton: '-',
    numberOneButton: '1',
    numberTwoButton: '2',
    numberThreeButton: '3',
    additionButton: '+',
    changeSignButton: '+/-',
    zeroButton: '0',
    dotButton: '.',
    equalSignButton: '='
};

const resultDiv = document.querySelector("#resultDiv");

// Calculations values
let firstValue = "";
let secondValue = "";
let operation = null;

let operationButtonPressed = false;
let dotButtonPressed = false;

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.id);
        buttonReaction(button);
    });
});

function buttonReaction(button) {

    if (button.classList.contains("numberButton")) {
        if (operationButtonPressed) {

            if (secondValue.length == 1 && calculatorButtons[button.id] == "0") {
                return;
            }

            secondValue += (calculatorButtons[button.id]);
            resultDiv.textContent += calculatorButtons[button.id];
            return;
        } else {

            if (firstValue.length == 1 && calculatorButtons[button.id] == "0") {
                return;
            }

            firstValue += (calculatorButtons[button.id]);
            resultDiv.textContent += calculatorButtons[button.id];
            return;
        }
    }

    if (button.classList.contains("operationButton")) {
        operationButtonPressed = true;
        operation = calculatorButtons[button.id];
        resultDiv.textContent = "";
        return;
    }

    if (button.id == "clearSign") {
        resultDiv.textContent = firstValue = secondValue = operation = "";
        operationButtonPressed = dotButtonPressed = false;
        return;
    }

    if (button.id == "deleteButton") {
        if (operationButtonPressed) {
            if (secondValue.length > 0) {
                resultDiv.textContent = secondValue = secondValue.substring(0, secondValue.length - 1);
            }
        } else {
            if (firstValue.length > 0) {
                resultDiv.textContent = firstValue = firstValue.substring(0, firstValue.length - 1);
            }
        }
        return;
    }

    if (button.id == "equalSignButton") {
        operate();
    }
}

function operate() {
    let tmpResult = 0;

    let firstNumber = Number(firstValue);
    let secondNumber = Number(secondValue);

    switch (operation) {
        case "+":
            tmpResult = firstNumber + secondNumber;
            break;
        case "-":
            tmpResult = firstNumber - secondNumber;
            break;
        case "*":
            tmpResult = firstNumber * secondNumber;
            break;
        case "/":
            tmpResult = firstNumber / secondNumber;
            break;
    }

    console.log("Result of the operation is: " + tmpResult);
    resultDiv.textContent = firstValue = tmpResult.toString();
    secondValue = "";
    operation = "";
    operationButtonPressed = false;
}
