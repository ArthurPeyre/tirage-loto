class Draw {
    static cost = 2.2;

    constructor(numbers = [], luckyNumber = null) {
        this.numbers = numbers;
        this.luckyNumber = luckyNumber;
    }

    static randomDraw() {
        const numbers = [];
        let luckyNumber;
        let i = 0;

        while (i < 5) {
            let num = Math.floor(Math.random() * 49) + 1;

            if (!numbers.find(n => n == num)) {
                numbers.push(num);
                i++;
            }
        }

        numbers.sort((a, b) => a - b);

        luckyNumber = Math.floor(Math.random() * 10) + 1;

        return new Draw(numbers, luckyNumber);
    }

    isValide() {
        return this.numbers.length == 5 && this.luckyNumber ? true : false;
    }
}


// GLOBAL VARIABLES
const draws = [];
let currentDraw = new Draw;
const gains = [
    149651,
    987,
    336.9,
    56.5
]

let numbers;
let luckyNumber;
let randomDrawBtn;
let submitContainer;
let submitBtn;
let gain;


// REFRESH FUNCTIONS
const refreshGrid = () => {
    numbers.innerHTML = '';
    for (let i=1; i<=49; i++) {
        numbers.innerHTML += `<div class="number ${currentDraw.numbers.find(num => num == i) ? 'selected' : ''}" onclick="toggleNumber(${i})">${i}</div>`;
    }

    luckyNumber.innerHTML = '';
    for (let i=1; i<=10; i++) {
        luckyNumber.innerHTML += `<div class="number ${currentDraw.luckyNumber == i ? 'selected' : ''}" onclick="toggleLuckyNumber(${i})">${i}</div>`;
    }
}

const refreshSubmitBtn = () => {
    if (currentDraw.isValide()) {
        submitContainer.classList.add('validated');
    } else {
        submitContainer.classList.remove('validated');
    }
}

const refreshUI = () => {
    refreshGrid();
    refreshSubmitBtn();
    // document.querySelector('body').style.boxShadow = "none";
}


const toggleNumber = (num) => {
    if (currentDraw.numbers.find(number => number == num)) {
        currentDraw.numbers = currentDraw.numbers.filter(number => number != num);
        refreshUI();
        return;
    }

    if (currentDraw.numbers.length >= 5) return;

    currentDraw.numbers.push(num);
    currentDraw.numbers.sort((a, b) => a - b);

    refreshUI();
}

const toggleLuckyNumber = (num) => {
    if (currentDraw.luckyNumber == num) {
        currentDraw.luckyNumber = null;
    } else {
        currentDraw.luckyNumber = num;
    }

    refreshUI();
}

const genDraw = () => {
    currentDraw = Draw.randomDraw();
    refreshUI();
}


const loto = () => {
    const draw = Draw.randomDraw();
    let valideNumbers = currentDraw.numbers.filter(num => draw.numbers.find(number => number == num));
    let luckyValid = currentDraw.luckyNumber == draw.luckyNumber ? true : false;

    
    if (valideNumbers.length >= 3) {
        console.log(`Tirage: ${draw.numbers}\nNuméros communs: ${valideNumbers.length}`);
        document.querySelector('body').style.boxShadow = "inset 0 0 0 .25rem lightGreen";

        if (luckyValid) {
            gain.innerHTML = gains[3];
        }

        if (valideNumbers.length >=4) {
            gain.innerHTML = gains[2];
            if (luckyValid) {
                gain.innerHTML = gains[1];
            }
        }

        if (valideNumbers.length == 5) {
            gain.innerHTML = gains[0];
        }
    } else {
        gain.innerHTML = 0;

        document.querySelector('body').style.boxShadow = "inset 0 0 0 .25rem red";
    }
}


window.addEventListener('DOMContentLoaded', () => {
    numbers = document.getElementById('numbers');
    luckyNumber = document.getElementById('luckyNumber');
    randomDrawBtn = document.getElementById('randomBtn');
    randomDrawBtn.addEventListener('click', genDraw);
    submitContainer = document.getElementById('submitBtn__container');
    submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', () => {
        if (!currentDraw.isValide()) return;
        loto();
        // ===== TEST =====
        // let i = 1;
        // while (gain.innerHTML <= 10) {
        //     loto();
        //     i++;
        // }
        // console.log(i);
        currentDraw = new Draw();
        refreshUI()
    });
    gain = document.getElementById('gain');

    refreshUI();
});