const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const methods = document.querySelectorAll('.method')
const screen = document.querySelector('.screen');

const calculator = {
    firstNumber: 0,
    secondNumber: undefined,
    operator: undefined,
    equalPressed: false,
}

numbers.forEach(number => number.addEventListener('click', e=>{
    if (screen.textContent.length == 15) return;
    
        if(calculator.equalPressed === true){
            calculator.firstNumber = 0; 
        }


        if (calculator.operator === undefined) {
            screen.textContent = (calculator.firstNumber === 0)? e.target.dataset.key : screen.textContent + e.target.dataset.key
            calculator.firstNumber = parseInt(screen.textContent)    
        }else{
            screen.textContent = (calculator.secondNumber === undefined)? e.target.dataset.key : screen.textContent + e.target.dataset.key
            calculator.secondNumber = parseInt(screen.textContent) 
        }
    
    console.log(e.target.dataset.key);
}));

operators.forEach(operator => operator.addEventListener('click', e=>{

    if (e.target.dataset.operator === 'equal') {
        let operation = (operate(calculator.firstNumber, calculator.secondNumber, calculator.operator)).toString();
        operation = (operation.length > 15)? operation.slice(0, 15) : operation;

        screen.textContent = operation;
        calculator.firstNumber = parseInt(screen.textContent);
        calculator.secondNumber = undefined;
        calculator.operator = undefined;
        calculator.equalPressed = true;
        return;

    }else if(calculator.operator !== undefined){
        let operation = (operate(calculator.firstNumber, calculator.secondNumber, calculator.operator)).toString();
        operation = (operation.length > 15)? operation.slice(0, 15) : operation;
        screen.textContent = operation
        calculator.firstNumber = parseInt(screen.textContent)
        calculator.secondNumber = undefined;
        calculator.operator = e.target.dataset.operator
    }else{
        calculator.operator = e.target.dataset.operator
    }

    calculator.equalPressed = false
}));

methods.forEach(method => method.addEventListener('click', e=>{
    if(e.target.dataset.method === 'C'){
        console.log('si');
        calculator.firstNumber = 0;
        screen.textContent = calculator.firstNumber
        calculator.secondNumber = undefined;
        calculator.operator = undefined;
        calculator.equalPressed = false;
    }
}))

const operate = (a, b, operator) =>{
    if (b === 0 && operator === 'div') return 'XD'
    console.log('kkk');
    if(b === undefined){
        b = a;
    }

    return (operator == 'add')? a+b :
            (operator == 'rest')? a-b :
            (operator == 'mult')? a*b : 
            (operator == 'div')? a/b : screen.textContent;  
}