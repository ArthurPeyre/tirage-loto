class Draw {
    static cost = 2.2;

    constructor(numbers, luckyNumber) {
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
}


// GLOBAL VARIABLES
const draws = [];
let currentDraw = [];
let currentLuckyNumber;
let gain = 0;
let spent = 0;
let coin = 50;

let gridContainer;
let drawContainer;
let luckyGridContainer;
let luckyNumberContainer;


const profit = () => {
    return gain - spent;
}


const refreshGrid = () => {
    gridContainer.innerHTML = '';

    for (let i=0; i<5; i++) {

        let html = '';

        html += `<div class="row">`;

        for (let j=1; j<=10; j++) {
            let num = i*10 + j;
            if (num !== 50) html += `<button class="number ${currentDraw.find(number => number == num) ? 'selected' : ''}" onclick="toggleNumber(${num})">${num}</button>`;
        }

        html += `</div>`;

        gridContainer.innerHTML += html;
    }


    let html = `<div class="row">`;

    for (let j=1; j<=10; j++) {
        html += `<button class="number ${currentLuckyNumber == j ? 'selected' : ''}" onclick="toggleLuckyNumber(${j})">${j}</button>`;
    }

    html += `</div>`;

    luckyGridContainer.innerHTML = html;
}


// CLICK ON NUMBER
const toggleNumber = (num) => {
    if (currentDraw.find(number => num == number)) {
        currentDraw = currentDraw.filter(number => number != num)
        refreshGrid();
        return;
    }

    if (currentDraw.length === 5) return;

    currentDraw.push(num);
    currentDraw.sort((a, b) => a - b);

    refreshGrid();
}


// CLICK ON LUCKY NUMBER
const toggleLuckyNumber = (num) => {
    currentLuckyNumber = currentLuckyNumber != num ? num : null;

    refreshGrid();
}


window.addEventListener('DOMContentLoaded', () => {
    gridContainer = document.getElementById('grid');
    drawContainer = document.getElementById('draw__container');
    luckyGridContainer = document.getElementById('luckyGrid');
    luckyNumberContainer = document.getElementById('luckyNumber');
    console.log(Draw.randomDraw());

    refreshGrid();
});