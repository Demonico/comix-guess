var comixGuessGame = {
  heroList: {
    Angel: {
      realName: 'Warren Kenneth Worthington III',
      powers: 'Winged Flight',
      img:
        './assets/images/Angel.png'
    },
    Beast: {
      realName: 'Hank McCoy',
      powers: 'Superhuman physical strength and agility',
      img:
        './assets/images/Beast.jpg'
    },
    Colossus: {
      realName: 'Piotr Nikolaievitch Rasputin',
      powers:
        'Transformation of body into steel-like substance granting superhuman strength, stamina, endurance and durability',
      img: './assets/images/Colossus.jpg'
    },
    Cyclops: {
      realName: 'Scott Summers',
      powers: 'Optic Blasts',
      img:
        './assets/images/cyclops.jpg'
    },
    Gambit: {
      realName: 'Remy LeBeau',
      powers: 'Kinetic conversion and acceleration',
      img: './assets/images/Gambit.jpg'
    },
    Iceman: {
      realName: 'Bobby Drake',
      powers: 'Control of Ice and Cold',
      img: './assets/images/iceman.jpg'
    },
    'Jean Grey': {
      realName: 'Jean Grey',
      powers: 'Telepathy and Telekinesis',
      img: './assets/images/jean_grey.jpg'
    },
    Jubilee: {
      realName: 'Jubilation Lee',
      powers: 'Pyrotechnic energy blasts',
      img: './assets/images/Jubilee.jpg'
    },
    Nightcrawler: {
      realName: 'Kurt Wagner',
      powers: 'Teleportation',
      img: './assets/images/nightcrawler.jpg'
    },
    Shadowcat: {
      realName: 'Kitty Pryde',
      powers: 'Intangibility',
      img: './assets/images/shadowcat.png'
    },
    Storm: {
      realName: 'Ororo Munroe',
      powers: 'Weather control',
      img: './assets/images/Storm.jpg'
    },
    Wolverine: {
      realName: 'James Howlett',
      powers: 'Superhuman senses and healing',
      img: './assets/images/wolverine.jpg'
    }
  },

  // global vars
  randHero: null,
  hiddenHero: null,
  letterGuessed: null,
  correctGuesses: [],
  wrongGuesses: [],
  guessesRemaining: 10,
  wins: 0,
  losses: 0,
  realNameHint: null,
  powersHint: null,
  imgHint: null,

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
    this.hiddenHero = []
    for (i = 0; i < this.randHero.length; i++) {
      if (this.correctGuesses.indexOf(this.randHero[i].toLowerCase()) !== -1) {
        word += this.randHero[i]
        this.hiddenHero.push(this.randHero[i])
        // console.log('Hidden Hero',this.hiddenHero);
      } else if (this.randHero[i] === ' ') {
        word += '&nbsp;&nbsp;&nbsp;'
        this.hiddenHero.push(' ')
      } else word += '&nbsp;_&nbsp;'
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
    this.guessesRemaining = 10
    this.buildObfuscatedWord()
    this.resetHints()

    document.querySelector('#wins').innerHTML = `Wins: ${this.wins}`
    document.querySelector('#losses').innerHTML = `Losses: ${this.losses}`
  },

  selectRandHero: function() {
    this.randHero = Object.keys(this.heroList)[
      Math.floor(Math.random() * Object.keys(this.heroList).length)
    ]
    // console.log(this.randHero)
  },

  resetHints: function() {
    // remove Hero name, powers and image
    document.querySelector('.card-title').textContent = ''
    document.querySelector('.card-text').textContent = ''
    document.querySelector('.card-img-top').src =
      './assets/images/question_mark.png'

    // show hint buttons
    var hintList = document.querySelectorAll('.hint')
    for (var i = 0; i < hintList.length; i++) {
      hintList[i].parentElement.style.display = 'block'
    }
  },

  processLetter: function(letter) {
    this.updateGuessedLetters(letter)
    this.buildObfuscatedWord()
    // check wins
    this.endCheck()
    this.updatePage()
  },

  updatePage: function() {
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
    } else if (this.guessesRemaining <= 0) {
      this.losses++
      alert('You Lose!')
      this.restartGame()
    }
  },

  hintHandler: function(hint) {
    // console.log(hint.path[0].id)
    var hintID = hint.path[0].id

    // Hide the button after it is pressed
    document.querySelector(`#${hintID}`).parentElement.style.display = 'none'

    switch (hintID) {
      case 'real-name':
        document.querySelector('.card-title').textContent =
          'Real Name: ' + this.heroList[this.randHero].realName
        this.guessesRemaining--
        this.updatePage()
        break
      case 'power-hint':
        document.querySelector('.card-text').textContent =
          'Powers: ' + this.heroList[this.randHero].powers
        this.guessesRemaining -= 2
        this.updatePage()
        break
      case 'img-hint':
        document.querySelector('.card-img-top').src = this.heroList[
          this.randHero
        ].img
        this.guessesRemaining -= 3
        this.updatePage()
    }
  }
}

comixGuessGame.startGame()

var hintButtons = document.querySelectorAll('.hint')

for (var i = 0; i < hintButtons.length; i++) {
  hintButtons[i].addEventListener('click', function(e) {
    comixGuessGame.hintHandler(e)
  })
}

document.onkeydown = function(e) {
  // console.log('Letter Guessed:', e.key)
  comixGuessGame.letterGuessed = e.key
  comixGuessGame.processLetter(comixGuessGame.letterGuessed)
}
