const words = [
    { word: 'javascript', hint: 'A popular programming language' },
    { word: 'hangman', hint: 'A classic word-guessing game' },
    { word: 'programming', hint: 'The process of writing code' },
    { word: 'coding', hint: 'Another term for programming' },
    { word: 'developer', hint: 'A person who writes code' }
];

let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 6;
let timer;
const maxTime = 60; 

const wordContainer = document.getElementById('word-container');
const message = document.getElementById('message');
const hangmanImage = document.getElementById('hangman-image');
const lettersContainer = document.getElementById('letters-container');
const resetButton = document.getElementById('reset-button');
const manContainer = document.getElementById('man-container');
const hintContainer = document.getElementById('hint-container');
const timerContainer = document.getElementById('timer-container');
const incorrectGuessesContainer = document.getElementById('incorrect-guesses-container');

const images = [
    'images/0.png',
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png'
];

function initGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    const hint = words[randomIndex].hint;
    
    guessedLetters = [];
    wrongGuesses = 0;
    message.textContent = '';
    incorrectGuessesContainer.textContent = 'Incorrect guesses: 0 / ' + maxGuesses;
    
    hangmanImage.src = images[0];
    
    hintContainer.textContent = 'Hint: ' + hint;
    
    resetTimer();
    
    updateWordContainer();
    createLetterButtons();
}

function updateWordContainer() {
    wordContainer.innerHTML = '';
    for (let letter of selectedWord) {
        wordContainer.innerHTML += guessedLetters.includes(letter) ? (letter + ' ') : '_ ';
    }
    checkGameStatus();
}

function createLetterButtons() {
    lettersContainer.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('letter-button');
        button.textContent = letter;
        button.addEventListener('click', () => guessLetter(letter, button));
        lettersContainer.appendChild(button);
    });
}

function guessLetter(letter, button) {
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);
    button.disabled = true;  
    
    if (selectedWord.includes(letter)) {
        updateWordContainer();
    } else {
        hangmanImage.src = images[wrongGuesses + 1];
        wrongGuesses++;
        incorrectGuessesContainer.textContent = 'Incorrect guesses: ' + wrongGuesses + ' / ' + maxGuesses;
    }
    if (wrongGuesses === maxGuesses) {
        message.textContent = 'Game Over! The word was "' + selectedWord + '"';
        lettersContainer.innerHTML = '';
        clearInterval(timer);
    }
}

function checkGameStatus() {
    const wordCompleted = selectedWord.split('').every(letter => guessedLetters.includes(letter));
    if (wordCompleted) {
        message.textContent = 'Congratulations! You won!';
        lettersContainer.innerHTML = '';
        clearInterval(timer);
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
}

function pad(value) {
    return value.toString().padStart(2, '0');
}

function resetTimer() {
    let timeLeft = maxTime;
    timerContainer.textContent = 'Time Left: ' + formatTime(timeLeft);
    
    timer = setInterval(() => {
        timeLeft--;
        timerContainer.textContent = 'Time Left: ' + formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timer);
            message.textContent = 'Game Over! Time\'s up! The word was "' + selectedWord + '"';
            lettersContainer.innerHTML = '';
        }
    }, 1000);
}

resetButton.addEventListener('click', initGame);

initGame();