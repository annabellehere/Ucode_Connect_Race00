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
        isClickedExponent = false;
    }
          
    appendNumber(number) {
        if(number === '.' && this.currentValue === 0) this.currentValue = "0.";
        else if (this.currentValue === 0) this.currentValue = number;
        else this.currentValue += number;
    }
          
    setDecimalPoint() {
        if(this.currentValue.toString().indexOf('.') !== -1) return false;
        else return true;
    }
          
    toggleSign() {
        if(typeof this.currentValue === 'string' && this.currentValue === '-0') {
            this.currentValue = 0;
            return;
        }
        this.currentValue = this.currentValue * -1;
        if(this.currentValue === -0) this.currentValue = '-0';
    }
          
    performOperation(operator) {
        if(operator === "X") operator = '*'; 
        this.history += this.currentValue + ' ' + operator + ' ';
    }

    calculateResult() {
        let result;
        if(isClickedExponent) {
            result = this.calculateExponentiation();
            this.currentValue = result;
            this.history = '';
            historyElement.textContent = '';
            isClickedExponent = false;
            return;
        }
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
        parts = parts.join(' ').trim().split(' ');
        for(let i = 0; i < parts.length;i++) if(parts[i] == "") parts.splice(i--, 1);
        result = parts[0];
        for(let i = 0; i < parts.length; i++) if (parts[i].includes('+') || parts[i].includes('-')) finish = false;
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
        if (result.toString().includes('.')) result = Number(result.toFixed(15));
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
        for (let i = 1; i <= this.currentValue; i++) result *= i;
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
        this.memory += +this.currentValue;
    }
          
    subtractFromMemory() {
        this.memory -= this.currentValue;
    }

    recallMemory() {
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
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = Math.cos(radiansValue);
    }
    
    radians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    calculateSine() {
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = Math.sin(radiansValue);
    }

    calculateTangent() {
        const radiansValue = this.radians(parseFloat(this.currentValue));
        this.currentValue = Math.tan(radiansValue);
    }

    calculateCotangent() {
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

