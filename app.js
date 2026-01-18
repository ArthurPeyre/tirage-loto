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
let gain = 0;
let spent = 0;
let coin = 50;
let selfDraw = true;

let gridContainer;
let drawContainer;
let luckyGridContainer;
let luckyNumberContainer;
let validateDrawBtn;


const profit = () => {
    return gain - spent;
}


const refreshGrid = () => {
    gridContainer.innerHTML = '';
    luckyGridContainer.innerHTML = '';
    drawContainer.innerHTML = '';
    luckyNumberContainer.innerHTML = '';

    if (!selfDraw) return;
    
    // Main grid
    for (let i=0; i<5; i++) {

        let html = '';

        html += `<div class="row">`;

        for (let j=1; j<=10; j++) {
            let num = i*10 + j;
            if (num !== 50) html += `<button class="number ${currentDraw.numbers.find(number => number == num) ? 'selected' : ''}" onclick="toggleNumber(${num})">${num}</button>`;
        }

        html += `</div>`;

        gridContainer.innerHTML += html;
    }

    // Lucky grid
    let html = `<div class="row">`;
    for (let j=1; j<=10; j++) {
        html += `<button class="number lucky ${currentDraw.luckyNumber == j ? 'selected' : ''}" onclick="toggleLuckyNumber(${j})">${j}</button>`;
    }
    html += `</div>`;
    luckyGridContainer.innerHTML = html;

    currentDraw.numbers.forEach(num => {
        drawContainer.innerHTML += `<button class="number">${num}</button>`;
    });
    luckyNumberContainer.innerHTML = currentDraw.luckyNumber ? `<button class="number lucky selected">${currentDraw.luckyNumber}</button>` : '';

    if (currentDraw.isValide()) {
        validateDrawBtn.classList.remove('disabled');
    } else {
        validateDrawBtn.classList.add('disabled');
    }
}


// CLICK ON NUMBER
const toggleNumber = (num) => {
    if (currentDraw.numbers.find(number => num == number)) {
        currentDraw.numbers = currentDraw.numbers.filter(number => number != num);
        refreshGrid();
        return;
    }

    if (currentDraw.numbers.length === 5) return;

    currentDraw.numbers.push(num);
    currentDraw.numbers.sort((a, b) => a - b);

    refreshGrid();
}


// CLICK ON LUCKY NUMBER
const toggleLuckyNumber = (num) => {
    currentDraw.luckyNumber = currentDraw.luckyNumber != num ? num : null;

    refreshGrid();
}


const addDraw = (draw) => {
    if (!draw.isValide()) return;

    draws.push(draw);

    console.log(draws);

    if (draw === currentDraw) selfDraw = false;
    
    draw.numbers = [];
    draw.luckyNumber = null;

    refreshGrid();
}


window.addEventListener('DOMContentLoaded', () => {
    gridContainer = document.getElementById('grid');
    drawContainer = document.getElementById('draw__container');
    luckyGridContainer = document.getElementById('luckyGrid');
    luckyNumberContainer = document.getElementById('luckyNumber');

    validateDrawBtn = document.getElementById('validateDrawBtn');
    validateDrawBtn.addEventListener('click', () => {
        addDraw(currentDraw);
    });

    refreshGrid();
});