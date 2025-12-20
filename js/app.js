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
let guessArr = [];



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
    secretNum = "";
    for (let i = 0; i < maxDigits; i++) {
        secretNum = secretNum + Math.floor(Math.random() * 10)
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
    messageEl.textContent = text;
    messageEl.style.display = "block";
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
    if (gameOver || currentGuess.length >= maxDigits) return;
    currentGuess = currentGuess + digit;
    const row = rowsEl[activeRow];
    const cellIndex = currentGuess.length - 1;
    row.children[cellIndex].textContent = digit;
}

function handleDelete() {
    let newNum = currentGuess.slice(0,(currentGuess.length - 1));
    currentGuess = newNum;
    const row = rowsEl[activeRow];
    const cellIndex = currentGuess.length;
    row.children[cellIndex].textContent = "";
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
    if (currentGuess.length !== maxDigits) return;
    checkGuess(currentGuess)
    renderFeedback()
    checkWinLose()
    if (!gameOver){
        attempts.push(currentGuess);
        attemptCount ++;
        currentGuess = "";
        activeRow ++;
        advanceRow();
    }
}

function checkGuess(guess) {
    secretCopy= secretNum.split("");
    guessArr= guess.split("");
    feedbackArray = [];
    guessArr.forEach((digit,index) => {
        if (digit === secretCopy[index]){
            feedbackArray[index] = "correct";
            secretCopy[index] = null;
        }
    });
    guessArr.forEach((digit,index) => {
        if (feedbackArray[index] === "correct") return;
        if (secretCopy.includes(digit)){
            feedbackArray[index] = "present";
            secretCopy[secretCopy.indexOf(digit)] = null;
        }
        else {
            feedbackArray[index] = "absent";
        }     
    });
    return feedbackArray;
}

function renderFeedback() {
    const row = rowsEl[activeRow];
    feedbackArray.forEach((feedback, index) => {
        row.children[index].classList.add(feedback);
    });
}

function advanceRow() {

}

function checkWinLose() {
    if (feedbackArray.every(val => val === "correct")){
        handleWin();
        gameOver = true;
        return;
    }
    if (attemptCount === rowsEl.length - 1){
        handleLoss();
        gameOver = true;
    }
}

function handleWin() {
    gameOver = true;
    canType = false;
    updateMessage("Congratulations! You won!");
    playAgainBtn.style.display = "block";
}

function handleLoss() {

}

function handlePlayAgain() {
    resetUI()
    startGame()
}