const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');

numbers.forEach(number => number.addEventListener('click', e=>{
    if (screen.textContent.length < 15) {
        screen.textContent += e.target.dataset.key
    }
    console.log(e.target.dataset.key);
}));

const operate = (a, b, operator) =>{
return (operator == 'sum')? a+b :
       (operator == 'rest')? a-b :
       (operator == 'mult')? a*b : a/b
}
console.log(operate(2, 2, 'div'));