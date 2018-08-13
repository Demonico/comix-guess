var comixGuessGame = {
  heroList: ['Jean Grey', 'Cyclopse', 'Nightcrawler', 'Wolverine'],

  // global vars
  randHero: null,
  hiddenHero: null,
  letterGuessed: null,
  correctGuesses: [],
  wrongGuesses: [],
  guessesRemaining: 10,
  wins: 0,
  losses: 0,

  // start game function
  startGame: function() {
    this.selectRandHero()
    this.buildObfuscatedWord()
    document.querySelector(
      '#guesses-remaining'
    ).innerHTML = `Guesses Remaining: ${this.guessesRemaining}`
    document.querySelector('#wins').innerHTML = `Wins: ${this.wins}`
    document.querySelector('#losses').innerHTML = `Losses: ${this.losses}`
    document.querySelector(
      '#letters-guessed'
    ).innerHTML = `Incorrect Guesses: ${this.wrongGuesses.join(', ')}`
  },

  buildObfuscatedWord: function() {
    word = "Superhero's name:&nbsp;"
    this.hiddenHero = [];
    for (i = 0; i < this.randHero.length; i++) {
      if (this.correctGuesses.indexOf(this.randHero[i].toLowerCase()) !== -1) {
        word += this.randHero[i]
        this.hiddenHero.push(this.randHero[i])
        // console.log('Hidden Hero',this.hiddenHero);
      } else if (this.randHero[i] === ' ') {
        word += '&nbsp;&nbsp;&nbsp;'
        this.hiddenHero.push(' ')
      } else word += ' _ '
    }
    document.querySelector('#word').innerHTML = word
  },

  updateGuessedLetters: function(letter) {
    if (
      this.randHero.toLowerCase().indexOf(letter) === -1 &&
      this.wrongGuesses.indexOf(letter) === -1
    ) {
      this.wrongGuesses.push(letter)
      this.guessesRemaining--
    } else if (this.correctGuesses.indexOf(letter) === -1) {
      this.correctGuesses.push(letter)
    }
  },

  restartGame: function() {
    this.letterGuessed = null
    this.selectRandHero()
    this.wrongGuesses = []
    this.correctGuesses = []
    this.guessesRemaining = 10;
    this.buildObfuscatedWord();
    document.querySelector('#wins').innerHTML = `Wins: ${this.wins}`
    document.querySelector('#losses').innerHTML = `Losses: ${this.losses}`
  },

  selectRandHero: function() {
    this.randHero = this.heroList[
      Math.floor(Math.random() * this.heroList.length)
    ]
    console.log(this.randHero)
  },

  // update page
  // use this to call the others
  updatePage: function(letter) {
    this.updateGuessedLetters(letter)
    this.buildObfuscatedWord()
    // check wins
    this.endCheck()
    document.querySelector(
      '#letters-guessed'
    ).innerHTML = `Incorrect Guesses: ${this.wrongGuesses.join(', ')}`
    document.querySelector(
      '#guesses-remaining'
    ).innerHTML = `Guesses Remaining: ${this.guessesRemaining}`
  },

  // check win condition
  endCheck: function() {
    // console.log('Correct Guesses Length', this.correctGuesses.length)
    if (this.hiddenHero.length === this.randHero.length) {
      this.wins++
      alert('You Win!')
      this.restartGame()
    } else if (this.guessesRemaining === 0) {
      this.losses++
      alert('You Lose!')
      this.restartGame()
    }
  }
}

comixGuessGame.startGame()

document.onkeydown = function(e) {
  // console.log('Letter Guessed:', e.key)
  comixGuessGame.letterGuessed = e.key
  comixGuessGame.updatePage(comixGuessGame.letterGuessed)
}
