/*-------------------------------- Constants --------------------------------*/
const maxDigits = 5;
const correctClass = "correct";
const presentClass = "present";
const absentClass = "absent";


/*---------------------------- Variables (state) ----------------------------*/
let secretNum = "";
let currentGuess = "";
let attempts = [];
let attemptCount = 0;
let activeRow = 0;
let gameOver = false;
let canType = true;
let secretCopy = "";
let feedbackArray = [];


/*------------------------ Cached Element References ------------------------*/
const gridEl = document.querySelector('#grid')
const rowsEl = document.querySelectorAll('.row')
const cellsEl = document.querySelectorAll('.cell')
const playAgainBtn = document.querySelector('#message')
const messageEl = document.querySelector('#play-again')


/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("keydown", handleKeydown);
playAgainBtn.addEventListener("click", handlePlayAgain);


/*-------------------------------- Functions --------------------------------*/
function generateSecretNum() {
 for(let i= 0; i<maxDigits; i++){
        secretNum= secretNum + Math.floor(Math.random()*10)
    }
    return secretNum
}

function resetUI() {
    rowsEl.forEach((row) => {
        row.classList.remove("active");
    });

    cellsEl.forEach((cell)=> {
        cell.textContent= "";
        cell.classList.remove(correctClass, presentClass, absentClass);
    });
   activeRow = 0; 
   rowsEl[activeRow].classList.add("active");
}

function updateMessage(text) {

}

function startGame() {
    gameOver = false;
    canType = true;
    currentGuess = "";
    attemptCount = 0;
    activeRow = 0;
    feedbackArray = [];
    resetUI();
    secretNum = generateSecretNum();
}

function handleDigit(digit) {

}

function handleDelete() {

}

function handleKeydown(event) {
    if (gameOver) return;

    if (event.key>= "0" && event.key <= "9"){
        handleDigit(event.key);
    }
    else if (event.key === "Backspace"){
        handleDelete()
    }
    else if (event.key === "Enter"){
        handleSubmit()
    }
}

function handleSubmit() {

}

function checkGuess(guess) {

}

function renderFeedback(feedbackArray) {

}

function advanceRow() {

}

function checkWinLose() {

}

function handleWin() {

}

function handleLoss() {

}

function handlePlayAgain() {

}