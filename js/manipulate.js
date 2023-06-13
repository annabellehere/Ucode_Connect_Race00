const calculator = new Calculator();

const outputElement = document.querySelector('.output');
const historyElement = document.querySelector('.history');
let isClickedExponent = false;

const numberButtons = document.querySelectorAll('.numb');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.historyClos) {
            historyElement.textContent = '';
            calculator.history = '';
            calculator.historyClos = false;
            calculator.currentValue = 0;
        }
        if(calculator.getOperator()) {
            calculator.currentValue = 0;
            calculator.setOperator();
        }
        if(calculator.hex) calculator.hex = false;
        const inputValue = button.textContent;
        if(calculator.currentValue.length > 16) return;
        if(isClickedExponent) {
            calculator.setPow(inputValue);
            outputElement.textContent = inputValue;
            return;
        }
        if (inputValue === '0' || inputValue === '00') {
            if (calculator.currentValue === 0) calculator.appendNumber(0);
            else calculator.appendNumber(inputValue);
        }
        else if (inputValue === '.') {
            if(calculator.setDecimalPoint()) calculator.appendNumber(inputValue);
        }
        else {
            calculator.appendNumber(inputValue);
        }
        outputElement.textContent = calculator.currentValue;
    });
});

const decimalButton = document.querySelector('.coma');
decimalButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.setDecimalPoint();
});

const signButton = document.querySelector('.plusminus');
signButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.toggleSign();
    outputElement.textContent = calculator.currentValue;
});

const operationButtons = document.querySelectorAll('.col2');
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.hex) return;
        if(calculator.historyClos) {
            historyElement.textContent = '';
            calculator.history = '';
            calculator.historyClos = false;
        }
        calculator.setOperator();
        calculator.performOperation(button.textContent);
        historyElement.textContent = calculator.history;
        outputElement.textContent = calculator.currentValue;
    });
});

const equalsButton = document.querySelector('.result');
equalsButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.setOperator();
    calculator.calculateResult();
    outputElement.textContent = calculator.currentValue;
});

const acButton = document.querySelector('.ac');
acButton.addEventListener('click', () => {
    calculator.reset();
    historyElement.textContent = '';
    outputElement.textContent = calculator.currentValue;
});

const percentButton = document.querySelector('.percent');
percentButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculatePercent();
    outputElement.textContent = calculator.currentValue;
});

const memoryRecallButton = document.querySelector('.mr');
memoryRecallButton.addEventListener('click', () => {
    calculator.recallMemory();
    outputElement.textContent = calculator.currentValue;
});

const memoryRecal = document.querySelector('.mr');

const memoryAddButton = document.querySelector('.m-plus');
memoryAddButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.setOperator();
    calculator.addToMemory();
    memoryRecal.style.backgroundColor = "white";
});

const memorySubtractButton = document.querySelector('.m-minus');
memorySubtractButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.setOperator();
    calculator.subtractFromMemory();
    memoryRecal.style.backgroundColor = "white";
});

const memoryClearButton = document.querySelector('.mc');
memoryClearButton.addEventListener('click', () => {
    calculator.clearMemory();
    memoryRecal.style.backgroundColor = "#E0F252";
});

const factorialButton = document.querySelector('.fac');
factorialButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculateFactorial();
    outputElement.textContent = calculator.currentValue;
});

const korenButton = document.querySelector('.kor');
korenButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculateSquareRoot();
    outputElement.textContent = calculator.currentValue;
});

const koren2Button = document.querySelector('.step2');
koren2Button.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.powValue = 2;
    result = calculator.calculateExponentiation();
    calculator.currentValue = result;
    outputElement.textContent = calculator.currentValue;
});

const koren3Button = document.querySelector('.step3');
koren3Button.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.powValue = 3;
    result = calculator.calculateExponentiation();
    calculator.currentValue = result;
    outputElement.textContent = calculator.currentValue;
});

const powerInput = document.querySelector('.power-input');
const exponentiationButton = document.querySelector('.exp');
exponentiationButton.addEventListener('click', () => {
    if(calculator.hex) return;
    if(!isClickedExponent) isClickedExponent = true;
});

const cosineButton = document.querySelector('.cos');
cosineButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculateCosine();
    outputElement.textContent = calculator.currentValue;
});

const sineButton = document.querySelector('.sin');
sineButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculateSine();
    outputElement.textContent = calculator.currentValue;
});

const tangentButton = document.querySelector('.tg');
tangentButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculateTangent();
    outputElement.textContent = calculator.currentValue;
});

const cotangentButton = document.querySelector('.ctg');
cotangentButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.calculateCotangent();
    outputElement.textContent = calculator.currentValue;
});

const fromSelectLeng = document.getElementById('from-unit-leng');
const toSelectLeng = document.getElementById('to-unit-leng');
const convertButtonLeng = document.querySelector('.convert-button-leng');
convertButtonLeng.addEventListener('click', () => {
    if(calculator.hex) return;
    const toUnit = fromSelectLeng.value;
    const fromUnit = toSelectLeng.value;

    if (fromUnit !== toUnit) {
        calculator.currentValue = calculator.convertLength(fromUnit, toUnit);
    }

    outputElement.textContent = calculator.currentValue;
});

const fromSelectWeig = document.getElementById('from-unit-weig');
const toSelectWeig = document.getElementById('to-unit-weig');
const convertButtonWeig = document.querySelector('.convert-button-weig');
convertButtonWeig.addEventListener('click', () => {
    if(calculator.hex) return;
    const fromUnit = toSelectWeig.value;
    const toUnit = fromSelectWeig.value;

    if (fromUnit !== toUnit) {
        calculator.currentValue = calculator.convertWeight(fromUnit, toUnit);
    }

    outputElement.textContent = calculator.currentValue;
});

const fromSelect = document.getElementById('from-unit-area');
const toSelect = document.getElementById('to-unit-area');
const convertButton = document.querySelector('.convert-button-area');
convertButton.addEventListener('click', () => {
    if(calculator.hex) return;
    const fromUnit = toSelect.value;
    const toUnit = fromSelect.value;

    if (fromUnit !== toUnit) {
        calculator.currentValue = calculator.convertArea(fromUnit, toUnit);
    }

    outputElement.textContent = calculator.currentValue;
});

const eButton = document.querySelector('.enumb');
eButton.addEventListener('click', () => {
  outputElement.textContent = Math.E;
});

const piButton = document.querySelector('.pinumb');
piButton.addEventListener('click', () => {
    outputElement.textContent = Math.PI;
});

const functionButtons = document.querySelector('.ln');
functionButtons.addEventListener('click', () => {
    if(calculator.hex) return;
    outputElement.textContent = Math.log(calculator.getCurrentValue());
});

const convertToBinaryButton = document.querySelector('.convert-binary');
convertToBinaryButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.convertToBinary();
    outputElement.textContent = calculator.currentValue;
    calculator.setOperator();
});

const convertToDecimalButton = document.querySelector('.convert-decimal');
convertToDecimalButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.convertToDecimal();
    outputElement.textContent = calculator.currentValue;
    calculator.setOperator();
});

const convertToHexadecimalButton = document.querySelector('.convert-hexadecimal');
convertToHexadecimalButton.addEventListener('click', () => {
    if(calculator.hex) return;
    calculator.convertToHexadecimal();
    outputElement.textContent = calculator.currentValue;
    calculator.setOperator();
});

const convertToDecimalFromHexadecimalButton = document.querySelector('.convert-decimal-from-hexadecimal');
convertToDecimalFromHexadecimalButton.addEventListener('click', () => {
  calculator.convertToDecimalFromHexadecimal();
  outputElement.textContent = calculator.currentValue;
  calculator.setOperator();
});
