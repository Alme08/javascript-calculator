const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const methods = document.querySelectorAll('.method')
const screen = document.querySelector('.screen');

const calculator = {
    firstNumber: 0,
    secondNumber: undefined,
    operator: undefined,
    equalPressed: false,
    dot: false,
}

const operate = (a, b, operator) =>{
    if (b === 0 && operator === 'div') return 'XD';

    if(b === undefined) b = a;

    return (operator == 'add')? a+b :
            (operator == 'rest')? a-b :
            (operator == 'mult')? a*b : 
            (operator == 'div')? a/b : screen.textContent;  
}

const numbersFunction = (number) =>{
    if (screen.textContent.length == 15) return;
    
    if(calculator.equalPressed === true) calculator.firstNumber = 0;

    if (calculator.operator === undefined) {
        screen.textContent = (calculator.firstNumber === 0 && calculator.dot == false)? number : screen.textContent + number;
        calculator.firstNumber = parseFloat(screen.textContent);
        calculator.equalPressed = false;
    }else{
        screen.textContent = (calculator.secondNumber === undefined && calculator.dot == false)? number : screen.textContent + number;
        calculator.secondNumber = parseFloat(screen.textContent);
    }
}

const operatorFunction = (operator) =>{
    if (operator === 'equal') {
        let operation = (operate(calculator.firstNumber, calculator.secondNumber, calculator.operator)).toString();
        operation = (operation.length > 15)? operation.slice(0, 15) : operation;
        screen.textContent = operation;
        calculator.firstNumber = parseFloat(screen.textContent);
        calculator.secondNumber = undefined;
        calculator.operator = undefined;
        calculator.equalPressed = true;
        calculator.dot = false;
        return;
    }else if(calculator.operator !== undefined){
        let operation = (operate(calculator.firstNumber, calculator.secondNumber, calculator.operator)).toString();
        operation = (operation.length > 15)? operation.slice(0, 15) : operation;
        screen.textContent = operation
        calculator.firstNumber = parseInt(screen.textContent)
        calculator.secondNumber = undefined;
        calculator.operator = operator
        calculator.dot = false;
    }else{
        calculator.operator = operator
        calculator.dot = false;
    }

    calculator.equalPressed = false
}

const methodsFunction = (method) =>{
    if(method === 'C'){

        calculator.firstNumber = 0;
        screen.textContent = calculator.firstNumber
        calculator.secondNumber = undefined;
        calculator.operator = undefined;
        calculator.equalPressed = false;
        calculator.dot = false

    }else if(method === 'dot'){

        if(screen.textContent.includes('.')) return;
        calculator.dot = true;
        screen.textContent += '.';
        (calculator.operator === undefined)? calculator.firstNumber = parseFloat(screen.textContent) : calculator.secondNumber = parseFloat(screen.textContent);

    }else if(method === 'percentage'){

        screen.textContent = parseFloat(screen.textContent/100);
        (calculator.operator === undefined)? calculator.firstNumber = parseFloat(screen.textContent) : calculator.secondNumber = parseFloat(screen.textContent);

    }else if(method === 'del'){

        (screen.textContent.length < 2)? screen.textContent = 0 : screen.textContent = screen.textContent.slice(0,-1);
        (calculator.operator === undefined)? calculator.firstNumber = parseFloat(screen.textContent) : calculator.secondNumber = parseFloat(screen.textContent);
        
    }
}

window.addEventListener('keyup', e=>{
    if(/\d/.test(e.key)){
        numbersFunction(e.key)
    }else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === 'Enter'){
        (e.key === '+')? operatorFunction('add') :
        (e.key === '-')? operatorFunction('rest') :
        (e.key === '*')? operatorFunction('mult') :
        (e.key === '/')? operatorFunction('div') : operatorFunction('equal')
    }else if(e.key === 'Delete' || e.key === '.' || e.key === '%' || e.key === 'Backspace'){
        (e.key === 'Delete')? methodsFunction('C') :
        (e.key === '.')? methodsFunction('dot') :
        (e.key === '%')? methodsFunction('percentage') : methodsFunction('del')
    }
    
    console.log(e.key);
})

numbers.forEach(number => number.addEventListener('click', e=> numbersFunction(e.target.dataset.key) ));
operators.forEach(operator => operator.addEventListener('click', e=> operatorFunction(e.target.dataset.operator)));
methods.forEach(method => method.addEventListener('click', e=>methodsFunction(e.target.dataset.method)));