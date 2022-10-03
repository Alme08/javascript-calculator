const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const methods = document.querySelectorAll('.method')
const screen = document.querySelector('.screen');

const calculator = {
    firstNumber: 0,
    secondNumber: undefined,
    operator: undefined,
    equalPressed: false,
    dot: false
}

numbers.forEach(number => number.addEventListener('click', e=>{
    if (screen.textContent.length == 15) return;
    
    if(calculator.equalPressed === true) calculator.firstNumber = 0;

    if (calculator.operator === undefined) {
        screen.textContent = (calculator.firstNumber === 0 && calculator.dot == false)? e.target.dataset.key : screen.textContent + e.target.dataset.key;
        calculator.firstNumber = parseFloat(screen.textContent);
        calculator.equalPressed = false;
    }else{
        screen.textContent = (calculator.secondNumber === undefined && calculator.dot == false)? e.target.dataset.key : screen.textContent + e.target.dataset.key;
        calculator.secondNumber = parseFloat(screen.textContent);
    }
}));

operators.forEach(operator => operator.addEventListener('click', e=>{

    if (e.target.dataset.operator === 'equal') {
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
        calculator.operator = e.target.dataset.operator
        calculator.dot = false;
    }else{
        calculator.operator = e.target.dataset.operator
        calculator.dot = false;
    }

    calculator.equalPressed = false
}));

methods.forEach(method => method.addEventListener('click', e=>{
    if(e.target.dataset.method === 'C'){

        calculator.firstNumber = 0;
        screen.textContent = calculator.firstNumber
        calculator.secondNumber = undefined;
        calculator.operator = undefined;
        calculator.equalPressed = false;
        calculator.dot = false

    }else if(e.target.dataset.method === 'dot'){

        if(screen.textContent.includes('.')) return;
        calculator.dot = true;
        screen.textContent += '.';
        (calculator.operator === undefined)? calculator.firstNumber = parseFloat(screen.textContent) : calculator.secondNumber = parseFloat(screen.textContent);

    }else if(e.target.dataset.method === 'percentage'){

        screen.textContent = parseFloat(screen.textContent/100);
        (calculator.operator === undefined)? calculator.firstNumber = parseFloat(screen.textContent) : calculator.secondNumber = parseFloat(screen.textContent);

    }else if(e.target.dataset.method === 'del'){

        (screen.textContent.length < 2)? screen.textContent = 0 : screen.textContent = screen.textContent.slice(0,-1);
        (calculator.operator === undefined)? calculator.firstNumber = parseFloat(screen.textContent) : calculator.secondNumber = parseFloat(screen.textContent);
        
    }
}))

const operate = (a, b, operator) =>{
    if (b === 0 && operator === 'div') return 'XD';

    if(b === undefined) b = a;

    return (operator == 'add')? a+b :
            (operator == 'rest')? a-b :
            (operator == 'mult')? a*b : 
            (operator == 'div')? a/b : screen.textContent;  
}