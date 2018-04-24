var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');


// VARIABLES
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var wordArr = [];
var lettersArr = [];
var spaceCount = 0;
var remainingNum = 0;
var extraChancesNum = 5;
var gameOver = false;


// MAIN GAME OBJECT
var game = {
  firstRun: function() {
    console.log('\n');
    console.log('\x1b[44m%s\x1b[0m', 'Guess the name of a Top-15 Bicycle Brand! ');
    console.log('\n');
    this.initGame();
  },
  secondRun: function() {
    console.log('\n');
    console.log('\x1b[45m%s\x1b[0m', ' Ok, let\'s play again... ');
    console.log('\n');
    this.initGame();
  },
  initGame: function() {
    wordArr = [];
    lettersArr = [];
    spaceCount = 0;
    remainingNum = 0;
    gameOver = false;
    var newWord = word[Math.floor(Math.random() * word.length)];

    wordArr = newWord.split('');
    var lowerWord = newWord.toLowerCase(); 
    wordArrLower = lowerWord.split(''); 
    for (var i = 0; i < wordArr.length; i++) {
      lettersArr.push(new letter(wordArr[i]));
      if (wordArr[i] === ' ') {
        spaceCount++;
      }
    }
    var charCount = (wordArr.length) - spaceCount;
    remainingNum = charCount + extraChancesNum;
 
    this.buildDisplayString(lettersArr);
  },
  buildDisplayString: function(lettersArr) {
    var displayString = '';
    for (var i = 0; i<lettersArr.length; i++) {
        if (lettersArr[i].isVisible) {
            displayString += lettersArr[i].value;
        } else {
            displayString += '_';
        }
    }
    console.log(displayString.split('').join(' ') + '\n');
    this.checkForLoss();
    this.checkForWin();
  
    if (!gameOver) {
      userInput();
    }
    return displayString;
  },
  updateDisplayString: function() {
      
    displayString = this.buildDisplayString(lettersArr);
  },
  compareLetters: function(letter) {
      
    var match = wordArrLower.indexOf(letter);
    if (match !== -1) {
      console.log('\x1b[32m%s\x1b[0m', '\nCORRECT!!\n');
    } else {
      remainingNum--;
      console.log('\x1b[31m%s\x1b[0m', '\nWrong. Try again.\n');
      console.log(remainingNum + ' guesses remaining.\n');
    }
    this.revealLetter(letter);
  }, 
  revealLetter: function(letter) {
      
    for (var i = 0; i < lettersArr.length; i++) {
        if (letter.toLowerCase() === lettersArr[i].value.toLowerCase()) {
            lettersArr[i].isVisible = true
        }
    }
    this.updateDisplayString();
  },
  checkForLoss: function() {
      
    if (remainingNum === 0) {
      console.log('\n');
      console.log('\x1b[41m%s\x1b[0m', ' You ran out of guesses. ');
      console.log('\n');
      gameOver = true;
      
      playAgain();
      return false;
    }
    return true;
  },
  checkForWin: function() {
      
    for (var i = 0; i < lettersArr.length; i++) {
      if (!lettersArr[i].isVisible) {
        return false;
      }
    }
    console.log('\n');
    console.log('\x1b[42m%s\x1b[0m', ' Correct! ');
    console.log('\n');
    gameOver = true;
    
    playAgain();
    return true;
  }
}
game.firstRun();


// USER INPUT 
function userInput() {

  var question = [
    {
      name: 'letter',
      message: 'Guess a letter:',
      type: 'input',
      filter: function(answer) {
        return answer.toLowerCase();
      },
      validate: function(answer) {
        var alphaIncl = alphabet.includes(answer);
        if ((answer.length !== 1) || (!alphaIncl)) {
          return 'Please, enter one letter.';
        }
        return true;
      }
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    game.compareLetters(answer.letter);
  });

}

function playAgain() {

  var question = [
    {
      name: 'restart',
      message: 'Do you want to play more?',
      type: 'list',
      choices: ['Yes', 'No']
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    if (answer.restart === 'Yes') {
      game.secondRun();
    } else {
      printBrands();
    }
  });

}

function printBrands() {

  var question = [
    {
      name: 'brands',
      message: 'Would you like to see a list of the the Top-15 Bicycle Brands?',
      type: 'list',
      choices: ['Yes', 'No']
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    if (answer.brands === 'Yes') {

      console.log(word);
      return false;
    } else {
      return false;
    }
  });

}