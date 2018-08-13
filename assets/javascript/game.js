var comixGuessGame = {
  heroList: {
    Angel: {
      'Real Name': 'Warren Kenneth Worthington III',
      Powers: 'Winged Flight',
      img:
        'https://upload.wikimedia.org/wikipedia/en/1/1b/X-men_angel_archangel.jpg'
    },
    Beast: {
      'Real Name': 'Hank McCoy',
      Powers: 'Superhuman physical strength and agility',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/HenryMcCoy-Beast.jpg/250px-HenryMcCoy-Beast.jpg'
    },
    Colossus: {
      'Real Name': 'Piotr Nikolaievitch Rasputin',
      Powers:
        'Transformation of body into steel-like substance granting superhuman strength, stamina, endurance and durability',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Colossus-AvX_Consequences.jpg/250px-Colossus-AvX_Consequences.jpg'
    },
    Cyclops: {
      'Real Name': 'Scott Summers',
      Powers: 'Optic Blasts',
      img:
        'https://en.wikipedia.org/wiki/File:Cyclops_(Marvel_Comics_character).jpg'
    },
    Gambit: {
      'Real Name': 'Remy LeBeau',
      Powers: 'Kinetic conversion and acceleration',
      img:
        'https://upload.wikimedia.org/wikipedia/en/9/94/Gambit_%28Marvel_Comics%29.png'
    },
    Iceman: {
      'Real Name': 'Booby Drake',
      Powers: 'Control of Ice and Cold',
      img:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Iceman_%28Bobby_Drake%29.png'
    },
    'Jean Grey': {
      'Real Name': 'Booby Drake',
      Powers: 'Telepathy and Telekinesis',
      img: 'https://en.wikipedia.org/wiki/File:JeanGreyPhoenix.png'
    },
    Jubilee: {
      'Real Name': 'Jubilation Lee',
      Powers: 'Pyrotechnic energy blasts',
      img: 'https://en.wikipedia.org/wiki/File:Jubilee_(Marvel_Comics).png'
    },
    Nightcrawler: {
      'Real Name': 'Kurt Wagner',
      Powers: 'Teleportation',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Nightcrawler.PNG/250px-Nightcrawler.PNG'
    },
    Shadowcat: {
      'Real Name': 'Kitty Pryde',
      Powers: 'Intangibility',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Kitty_Pryde_Astonishing_X-Men_Vol_3_16.png/250px-Kitty_Pryde_Astonishing_X-Men_Vol_3_16.png'
    },
    Storm: {
      'Real Name': 'Ororo Munroe',
      Powers: 'Weather control',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/X-Men_Storm_Main.png/250px-X-Men_Storm_Main.png'
    },
    Wolverine: {
      'Real Name': 'James Howlett',
      Powers: 'Teleportation',
      img: 'https://upload.wikimedia.org/wikipedia/en/c/c8/Marvelwolverine.jpg'
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
    this.guessesRemaining = 10
    this.buildObfuscatedWord()
    document.querySelector('#wins').innerHTML = `Wins: ${this.wins}`
    document.querySelector('#losses').innerHTML = `Losses: ${this.losses}`
  },

  selectRandHero: function() {
    this.randHero = Object.keys(this.heroList)[
      Math.floor(Math.random() * Object.keys(this.heroList).length)
    ]
    // console.log(this.randHero)
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
