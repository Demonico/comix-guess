var comixGuessGame = {
  heroList: [
    "Jean Grey",
    "Cyclopse",
    "Nightcrawler",
    "Wolverine"
  ],

  // global vars
  randWord: null,
  letterGuessed: null,
  correctGuesses:[],
  wrongGuesses: [],
  wins: 0,
  losses: 0,

  // start game function
  startGame: function(){},


  restartGame: function() {
    this.randWord = null;
    this.letterGuessed = null;
    this.selectRandWord();
    this.wrongGuesses = []
  },

  selectRandWord: function() {
    this.randWord = Math.floor(Math.random * this.heroList.length)
  },

  // update page
  // use this to call the others
  updatePage: function(letter) {}

  // check guessed letter

  // check win condition

}

document.onkeydown = function(e) {
  comixGuessGame.letterGuessed = e.key;
  comixGuessGame.updatePage(comixGuessGame.letterGuessed);

}