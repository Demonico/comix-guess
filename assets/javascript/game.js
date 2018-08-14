var comixGuessGame = {
  heroList: {
    Angel: {
      realName: 'Warren Kenneth Worthington III',
      powers: 'Winged Flight',
      img:
        'https://upload.wikimedia.org/wikipedia/en/1/1b/X-men_angel_archangel.jpg'
    },
    Beast: {
      realName: 'Hank McCoy',
      powers: 'Superhuman physical strength and agility',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/HenryMcCoy-Beast.jpg/250px-HenryMcCoy-Beast.jpg'
    },
    Colossus: {
      realName: 'Piotr Nikolaievitch Rasputin',
      powers:
        'Transformation of body into steel-like substance granting superhuman strength, stamina, endurance and durability',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Colossus-AvX_Consequences.jpg/250px-Colossus-AvX_Consequences.jpg'
    },
    Cyclops: {
      realName: 'Scott Summers',
      powers: 'Optic Blasts',
      img:
        'https://en.wikipedia.org/wiki/File:Cyclops_(Marvel_Comics_character).jpg'
    },
    Gambit: {
      realName: 'Remy LeBeau',
      powers: 'Kinetic conversion and acceleration',
      img:
        'https://upload.wikimedia.org/wikipedia/en/9/94/Gambit_%28Marvel_Comics%29.png'
    },
    Iceman: {
      realName: 'Bobby Drake',
      powers: 'Control of Ice and Cold',
      img:
        'https://upload.wikimedia.org/wikipedia/en/a/ad/Iceman_%28Bobby_Drake%29.png'
    },
    'Jean Grey': {
      realName: 'Jean Grey',
      powers: 'Telepathy and Telekinesis',
      img: 'https://en.wikipedia.org/wiki/File:JeanGreyPhoenix.png'
    },
    Jubilee: {
      realName: 'Jubilation Lee',
      powers: 'Pyrotechnic energy blasts',
      img: 'https://en.wikipedia.org/wiki/File:Jubilee_(Marvel_Comics).png'
    },
    Nightcrawler: {
      realName: 'Kurt Wagner',
      powers: 'Teleportation',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Nightcrawler.PNG/250px-Nightcrawler.PNG'
    },
    Shadowcat: {
      realName: 'Kitty Pryde',
      powers: 'Intangibility',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Kitty_Pryde_Astonishing_X-Men_Vol_3_16.png/250px-Kitty_Pryde_Astonishing_X-Men_Vol_3_16.png'
    },
    Storm: {
      realName: 'Ororo Munroe',
      powers: 'Weather control',
      img:
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/X-Men_Storm_Main.png/250px-X-Men_Storm_Main.png'
    },
    Wolverine: {
      realName: 'James Howlett',
      powers: 'Teleportation',
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
    this.letterGuessed = null;
    this.selectRandHero();
    this.wrongGuesses = [];
    this.correctGuesses = [];
    this.guessesRemaining = 10;
    this.buildObfuscatedWord();
    this.resetHints();
    
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
    var card = document.querySelector('.card');
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent='&nbsp;';
    card.innerHTML = cardBody;
    

    // show hint buttons
    var hintList = document.querySelectorAll('.hint');
    for(var i = 0; i< hintList.length; i++ ) {
      hintList[i].parentElement.style.display = "block";
    }

  },

  processLetter: function(letter) {
    this.updateGuessedLetters(letter)
    this.buildObfuscatedWord()
    // check wins
    this.endCheck()
    this.updatePage();
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
    var hintID = hint.path[0].id;
    var cardElem = document.querySelector('.card');
    var cardBody = document.querySelector('.card-body');
    var divElem = document.createElement('div'); // generec for the text and title
    var imgElem = document.createElement('img'); // create card image
    imgElem.classList.add('card-img-top');

    // Hide the button after it is pressed
    document.querySelector(`#${hintID}`).parentElement.style.display = "none";

    switch (hintID) {
      case 'real-name':
        divElem.textContent = "Real Name: " + this.heroList[this.randHero].realName;
        divElem.classList.add('card-title');
        cardBody.appendChild(divElem);
        this.guessesRemaining --;
        this.updatePage();
        break
      case 'power-hint':
        divElem.textContent = "Powers: " + this.heroList[this.randHero].powers;
        divElem.classList.add('card-text');
        cardBody.appendChild(divElem);
        this.guessesRemaining -= 2;
        this.updatePage();
        break
      case 'img-hint':
        imgElem.src = this.heroList[this.randHero].img;
        cardElem.appendChild(imgElem);
        this.guessesRemaining -=3;
        this.updatePage();
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
