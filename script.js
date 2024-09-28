document.addEventListener('DOMContentLoaded', () => {
    const words = ['TIGHER', 'ROCKED', 'AKASH', 'MUTHU'];  
    let currentWordIndex = 0;  
    let currentWord = words[currentWordIndex];  
    let guessesRemaining = 5;  
    let guessedLetters = [];  
    let correctGuesses = Array(currentWord.length).fill('_');  

    const wordContainer = document.getElementById('word-container');  
    const remainingGuessesEl = document.getElementById('remaining-guesses');  
    const guessInput = document.getElementById('guess-input');  
    const guessBtn = document.getElementById('guess-btn');  
    const resetBtn = document.getElementById('reset-btn');  
    const exitBtn = document.getElementById('exit-btn');  

    function revealClueLetters() {
        correctGuesses[0] = currentWord[0];  
        correctGuesses[currentWord.length - 1] = currentWord[currentWord.length - 1];  
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
            alert('Congratulations! You guessed the word!');
            loadNextWord();  
        } else if (guessesRemaining === 0) {
            alert('Game over! You ran out of guesses. The word was: ' + currentWord);
            resetGame();  
        }
    }

    function loadNextWord() {
        currentWordIndex = (currentWordIndex + 1) % words.length;  
        currentWord = words[currentWordIndex];  
        resetGame();  
    }

    guessBtn.addEventListener('click', () => {
        const guessedLetter = guessInput.value.toUpperCase();  
        if (guessedLetter && !guessedLetters.includes(guessedLetter)) {
            guessedLetters.push(guessedLetter);  
            checkGuess(guessedLetter);  
        } else if (guessedLetters.includes(guessedLetter)) {
            alert('You already guessed that letter!');
        } else {
            alert('Please enter a valid letter.');
        }
        guessInput.value = '';  
    });

    resetBtn.addEventListener('click', resetGame);

    function resetGame() {
        guessesRemaining = 5;  
        guessedLetters = [];  
        correctGuesses = Array(currentWord.length).fill('_');  
        revealClueLetters();  
        displayWord();  
        remainingGuessesEl.textContent = `You have ${guessesRemaining} guesses remaining.`;
    }

    exitBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';  
    });

    revealClueLetters();  
    displayWord();  
});
