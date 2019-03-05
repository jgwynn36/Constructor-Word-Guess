// dependency for inquirer npm package
const inquirer = require("inquirer");
const Word = require('./Word.js');

let guesses;
let pickedWords;
let word;
let pickedWord;

const wordBank = ["German Shepherd", "Chihuahua", "Pug", "Chinese Crested Dog", "Shih Tzu", "Greyhound", "Cocker Spaniel", "Bull Terrier", "Dobermann", "Alaskan Malamute", "Australian Cattle Dog", "Newfoundland dog", "St.Bernard", "Old English Sheepdog", "Airedale Terrier", "Portuguese Water Dog", "American Pit Bull Terrier", "Bullmastiff", "Cane Corso", "Bloodhound", "Poodle", "Siberian Husky", "Chow Chow", "Rottweiler"];

function runGame() {
    pickedWords = [];
    console.log("Please guess your favorite dog ...");
    playGame();
}

function playGame() {
    pickedWord = "";
    guesses = 15;
    if (pickedWords.length < wordBank.length) {
        pickedWord = getWord();
    } else {
        // WIN CONDITION
        console.log("Congrats! YOU WON....");
        continuePrompt();
    }
    if (pickedWord) {
        word = new Word(pickedWord);
        word.makeLetters();
        makeGuess();
    }
}

function getWord() {
    let rand = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[rand];
    if (pickedWords.indexOf(randomWord) === -1) {
        pickedWords.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}

function makeGuess() {
    let checker = [];
    inquirer.prompt([{
        type: "input",
        name: "guessedLetter",
        message: word.update() +
            "\nGuess a letter!" +
            "\nGuesses Left: " + guesses
    }]).then(data => {
        word.letters.forEach(letter => {
            letter.checkLetter(data.guessedLetter);
            checker.push(letter.getCharacter());
        });
        if (guesses > 0 && checker.indexOf("_") !== -1) {
            guesses--;
            if (guesses === 0) {
                console.log("YOU RAN OUT OF GUESSES! GAME OVER.");
                continuePrompt();
            } else {
                makeGuess();
            }
        } else {
            console.log("CONGRATULATIONS! YOU GOT THE WORD!");
            console.log(word.update());
            playGame();
        }
    });
}

function continuePrompt() {
    inquirer.prompt([{
        name: "continue",
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"]
    }]).then(data => {
        if (data.continue === "Yes") {
            init();
        } else {
            console.log("Thanks for playing!");
        }
    });
}

runGame();