class Calculator {
    constructor() {
        this.currentValue = 0;
        this.history = '';
        this.memory = 0;
        this.operator = false;
        this.powValue = 1;
        this.historyClos = false;
        this.hex = false;
    }
          
    reset() {
        this.currentValue = 0;
        this.history = '';
        isCkicked = false;
    }
          
    appendNumber(number) {
        if(number === ',' && this.currentValue === 0) this.currentValue = "0,";
        else if (this.currentValue === 0) {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
    }
          
    setDecimalPoint() {
        if(this.currentValue.toString().indexOf(',') !== -1) return false;
        else return true;
    }
          
    toggleSign() {
        if(typeof this.currentValue === 'string' && this.currentValue === '-0') {
            this.currentValue = 0;
            return;
        }
        if(typeof this.currentValue === 'string') {
            this.currentValue = this.currentValue.replaceAll(',', '.');
            this.currentValue = Number(this.currentValue);
        }
        this.currentValue = this.currentValue * -1;
        
        this.currentValue = this.currentValue.toString().replaceAll('.', ',');
        
        
        if(this.currentValue === -0) this.currentValue = '-0';
    }
          
    performOperation(operator) {
        if(operator === "X") operator = '*'; 
        this.history += this.currentValue + ' ' + operator + ' ';
    }

    calculateResult() {
        let result;
        if(isCkicked) {
            result = this.calculateExponentiation();
            this.currentValue = result;
            this.history = '';
            historyElement.textContent = '';
            isCkicked = false;
            return;
        }
        this.history = this.history.replaceAll(',', '.');
        let parts = this.history.split(' ');
        result = parseFloat(parts[0]);
        for(let i = 1; i < parts.length - 1; i += 2) {
            if(parts[i] === '*' || parts[i] === '/') {
                const operator = parts[i];
                const operand = parseFloat(parts[i + 1]);
                switch (operator) {
                case '*':
                    parts[i + 1] = parseFloat(parts[i - 1]) * operand;
                    break;
                case '/':
                    if (operand === 0) {
                        this.currentValue = "Error";
                        this.history = '';
                        return;
                    }
                    parts[i + 1] = parseFloat(parts[i - 1]) / operand;
                    break;
                }
                parts[i] = ' ';
                parts[i - 1] = ' '; 
            }
        }
        let finish = true;
        parts = parts.join(' ');
        parts = parts.trim();
        parts = parts.split(' ');
        for(let i = 0; i < parts.length;i++) {
            if(parts[i] == "") {
                parts.splice(i, 1);
                i--;
            }
        }
        result = parts[0];
        for(let i = 0; i < parts.length; i++) {    
            if (parts[i].includes('+') || parts[i].includes('-')) {
                finish = false;
            }
        }
        if(!finish) {
            result = parseFloat(parts[0]);
            for (let i = 1; i < parts.length - 1; i += 2) {
                const operator = parts[i];
                const operand = parseFloat(parts[i + 1]);
                switch (operator) {
                    case '+':
                        result += operand;
                        break;
                    case '-':
                        result -= operand;
                        break;
                }
            }
        }
        if(result.toString().includes('.')) {
            result = Number(result);
            result = Number(result.toFixed(16));
            result = Number(result.toPrecision(15));
            result = Number(result.toFixed(16));
        }
        result = result.toString().replaceAll('.', ',');
        this.currentValue = result;
        if(this.currentValue.length > 16) this.currentValue = "Too big value";
        this.historyClos = true;
    }
          
    calculateFactorial() {
        if(this.currentValue < 0){
            this.currentValue = "Error";
            return;
        }
        let result = 1;
        for (let i = 1; i <= this.currentValue; i++) {
            result *= i;
        }
        this.currentValue = result;
    }
          
    calculateExponentiation() {
        return Math.pow(this.currentValue, this.powValue);
    }
          
    calculateSquareRoot() {
        if(this.currentValue < 0){
            this.currentValue = "Error";
            return;
        }
        this.currentValue = Math.sqrt(this.currentValue);
    }
          
    addToMemory() {
        if(typeof this.currentValue === 'string') this.currentValue = this.currentValue.replaceAll(',', '.');
        this.memory += +this.currentValue;
    }
          
    subtractFromMemory() {
        if(typeof this.currentValue === 'string') this.currentValue = this.currentValue.replaceAll(',', '.');
        this.memory -= this.currentValue;
    }

    recallMemory() {
        this.memory = this.memory.toString().replaceAll('.', ',');
        this.currentValue = this.memory;
    }

    clearMemory() {
        this.memory = 0;
    }

    getOperator() {
        return this.operator;
    }

    setOperator() {
        if(this.operator) this.operator = false;
        else this.operator = true;
    }

    calculatePercent() {
        this.currentValue = this.currentValue / 100;
    }

    calculateCosine() {
        this.currentValue = this.currentValue.replaceAll(',', '.');
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = Math.cos(radiansValue);
    }
    
    radians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    calculateSine() {
        this.currentValue = this.currentValue.replaceAll(',', '.');
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = Math.sin(radiansValue);
    }

    calculateTangent() {
        this.currentValue = this.currentValue.replaceAll(',', '.');
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = Math.tan(radiansValue);
    }

    calculateCotangent() {
        this.currentValue = this.currentValue.replaceAll(',', '.');
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = 1 / Math.tan(radiansValue);
    }

    setPow(value) {
        this.powValue = value;
    }

    convertLength(fromUnit, toUnit) {
        const units = {
          mm: 0.001,
          cm: 0.01,
          m: 1,
          km: 1000,
        };
    
        return this.currentValue * (units[toUnit] / units[fromUnit]);
    }
    
    convertWeight(fromUnit, toUnit) {
        const units = {
          g: 1,
          kg: 1000,
          t: 1000000
        };
    
        return this.currentValue * (units[toUnit] / units[fromUnit]);
    }

    convertArea(fromUnit, toUnit) {
        const units = {
          cm2: 1,
          m2: 10000,
          km2: 10000000000,
          ha: 1000000
        };
    
        return this.currentValue * (units[toUnit] / units[fromUnit]);
    }

    getCurrentValue() {
        return this.currentValue;
    }

    convertToBinary() {
        const decimalValue = parseFloat(this.currentValue);
        this.currentValue = decimalValue.toString(2);
        if(this.currentValue.length > 30) this.currentValue = "Too big value!";
    }
    
    convertToDecimal() {
        const binaryValue = this.currentValue;
        for(let i = 0; i < binaryValue.length; i++) {
            if(binaryValue[i] !== '0' && binaryValue[i] !== '1'){
                this.currentValue = "Binary only contains 0 or 1!";
                return;
            }
        }
        this.currentValue = parseInt(binaryValue, 2);
    }
    
    convertToHexadecimal() {
        const decimalValue = parseFloat(this.currentValue);
        this.currentValue = decimalValue.toString(16);
        this.hex=true;
    }
    
    convertToDecimalFromHexadecimal() {
        const hexadecimalValue = this.currentValue;
        this.currentValue = parseInt(hexadecimalValue, 16).toString();
      }
  
}


const calculator = new Calculator();

const outputElement = document.querySelector('.output');
const historyElement = document.querySelector('.history');
let isCkicked = false;

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
        if(isCkicked) {
            calculator.setPow(inputValue);
            outputElement.textContent = inputValue;
            return;
        }
        if (inputValue === '0' || inputValue === '00') {
            if (calculator.currentValue === 0) calculator.appendNumber(0);
            else calculator.appendNumber(inputValue);
        }
        else if (inputValue === ',') {
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
    if(!isCkicked) isCkicked = true;
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
