document.addEventListener('DOMContentLoaded', () => {
    const words = ['TIGHTER', 'ROCKED', 'AKASH', 'MUTHU'];
    let currentWord;
    let guessesRemaining = 5;
    let guessedLetters = [];
    let correctGuesses;

    const wordContainer = document.getElementById('word-container');
    const remainingGuessesEl = document.getElementById('remaining-guesses');
    const guessInput = document.getElementById('guess-input');
    const guessBtn = document.getElementById('guess-btn');
    const resetBtn = document.getElementById('reset-btn');
    const exitBtn = document.getElementById('exit-btn');
    const messageContainer = document.getElementById('message-container');

    function selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        console.log(randomIndex)
        return words[randomIndex];
    }

    function revealClueLetters() {
        const randomIndex = Math.floor(Math.random() * currentWord.length);
        console.log(randomIndex)
        correctGuesses[randomIndex] = currentWord[randomIndex];
    }

    function displayWord() {
        wordContainer.innerHTML = '';
        correctGuesses.forEach(letter => {
            const letterBox = document.createElement('div');
            letterBox.classList.add('letter-box');
            letterBox.textContent = letter;
            wordContainer.appendChild(letterBox);
        });
    }

    function displayMessage(message) {
        messageContainer.textContent = message;
    }

    function checkGuess(letter) {
        let isCorrect = false;
        currentWord.split('').forEach((char, index) => {
            if (char === letter) {
                correctGuesses[index] = letter;
                isCorrect = true;
            }
        });

        if (!isCorrect) {
            guessesRemaining--;
        }

        displayWord();
        remainingGuessesEl.textContent = `You have ${guessesRemaining} guesses remaining.`;

        if (correctGuesses.join('') === currentWord) {
            displayMessage('Congratulations! You guessed the word!');
        } else if (guessesRemaining === 0) {
            displayMessage(`Game over! You ran out of guesses. The word was: ${currentWord}`);
        }
    }

    guessBtn.addEventListener('click', () => {
        const guessedLetter = guessInput.value.toUpperCase();
        if (guessedLetter && !guessedLetters.includes(guessedLetter)) {
            guessedLetters.push(guessedLetter);
            checkGuess(guessedLetter);
        }
        else if (guessedLetters.includes(guessedLetter)) {
            displayMessage('You already guessed that letter!');
        }
        else {
            displayMessage('Please enter a valid letter.');
        }
        guessInput.value = '';
    });

    resetBtn.addEventListener('click', resetGame);

    function resetGame() {
        currentWord = selectRandomWord();
        guessesRemaining = 5;
        guessedLetters = [];
        correctGuesses = Array(currentWord.length).fill('_');
        revealClueLetters();
        displayWord();
        remainingGuessesEl.textContent = `You have ${guessesRemaining} guesses remaining.`;
        messageContainer.textContent = '';
    }

    exitBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });
    resetGame();
});
