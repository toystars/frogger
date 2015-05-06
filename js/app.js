// godMode cheat Variable
var godMode = false;

// sound variable
var bugDeathSound = document.getElementById('bugDeath');
var gemPickerSound = document.getElementById('gemPicker');
var waterSound = document.getElementById('waterCrashed');
var levelSound = document.getElementById('levelUp');

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // Define positions
  this.x;
  this.y;

  // Define the default speed
  this.speed = Math.floor((Math.random() * 150) + 50);

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // regenerate

    if (this.x > 780) {
      this.configureEnemy();
    }

    // update x
    this.x += dt * this.speed;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  // Each time the browser redraws the enemy object on the canvas,
  // invoke the checkCollisions() function to check if the player object's
  // co-ordinates cross with the enemy co-ordinate
  checkCollisions(this, player);
  gemBugCollision(this, gem);
}

// Create enemies with the right coordinates
Enemy.prototype.configureEnemy = function() {
  // Create a random y coordinate
  var randomY = Math.floor((Math.random() * 4) + 1);
  if (randomY == 1) {
    this.y = 300;
  } else if (randomY == 2) {
    this.y = 220;
  } else if (randomY == 3) {
    this.y = 140;
  } else if (randomY == 4) {
    this.y = 60;
  }

  // create a random starting point for all enemy objects for them to appear on canvas at different times
  this.x = Math.floor((Math.random() * -350) - 150);

  // create a check to see if x co-ordinate created for enemy is equal or even close
  // to another one to avoid the stacking of enemies on one another
  var enemyPositionCheckArray = [];
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // Define player's positions
  this.x = 401;
  this.y = 380;

  // The image/sprite the player uses, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-horn-girl.png';
}

// Update the player's position cordinates
Player.prototype.update = function(dt) {

}

// Draw player's new position
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handle each keypress event so game can be rendered
Player.prototype.handleInput = function(arg) {

  // check the gameOver variable
  if (gameOver) {
    return;
  }
  
  if (arg == 'left') {
    // deduct 100 from x coordinate after checking for the boundary
    if (this.x - 100 >= 1) {
      this.x = this.x - 100;
      gemCollected(this, gem); // invokes the gemCollected function to perform some functions
      lifeCollected(this, life); // invokes the lifeCollected function to check if life was collected
    }
  } else if (arg == 'right') {
    // Add 100 to x coordinate after checking for the boundary
    if (this.x + 100 <= 701) {
      this.x = this.x + 100;
      gemCollected(this, gem); // invokes the gemCollected function to perform some functions
      lifeCollected(this, life); // invokes the lifeCollected function to check if life was collected
    }
  } else if (arg == 'up') {
    // Deduct 80 from y coordinate after checking for the boundary
    if (this.y - 80 >= 60) {
      this.y = this.y - 80;
      gemCollected(this, gem); // invokes the gemCollected function to perform some functions
      lifeCollected(this, life); // invokes the lifeCollected function to check if life was collected
    } else {
      // crashed in water
      if (waterSound) {
        waterSound.currentTime = 0;
        waterSound.play();
      }
      this.x = 401;
      this.y = 380;
      evaluateLife(this, gem);
    }
  } else if (arg == 'down') {
    // Add 80 to y coordinate after checking for the boundary
    if (this.y + 80 <= 380) {
      this.y = this.y + 80;
      gemCollected(this, gem); // invokes the gemCollected function to perform some functions
      lifeCollected(this, life); // invokes the lifeCollected function to check if life was collected
    }
  } else if (arg == 'g') {
    godMode = true;
  } else if (arg == 'o') {
    godMode = false;
  }
}

// Create a gem class to define how gems behave so as to give
// the game a better user experience with levels so that the
// bug speed increases...
var Gem = function() {
  // Variables applied to each of our instances go here,

  // Define Gem positions
  this.x;
  this.y;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/Gem-Blue.png';
}

/*
  Method to generate the the gem at any given instance it needs
  to be regenerated in a different location based on the first instantiation
  or after player's collection
*/
Gem.prototype.generate = function() {
  // Create a random y coordinate
  do {
    var randomY = Math.floor((Math.random() * 4) + 1);
    if (randomY == 1) {
      this.y = 300;
    } else if (randomY == 2) {
      this.y = 220;
    } else if (randomY == 3) {
      this.y = 140;
    } else if (randomY == 4) {
      this.y = 60;
    }

    // Create a random x coordinate
    var randomX = Math.floor((Math.random() * 5) + 1);
    if (randomX == 1) {
      this.x = 1;
    } else if (randomX == 2) {
      this.x = 101;
    } else if (randomX == 3) {
      this.x = 201;
    } else if (randomX == 4) {
      this.x = 301;
    } else if (randomX == 5) {
      this.x = 401;
    }
  } while ((player.x == this.x) && (player.y == this.y) && ((life.x == this.x) && (life.y == this.y)));
}

// Draw Gem's new position
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*
  Create a Life class that defines the methods and properties
  of a life bonus in the game during gameplay that makes it pop
  up randomly
*/
var Life = function() {
  // Variables applied to each of our instances go here,

  // Define Gem positions
  this.x;
  this.y;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/Heart.png';
}

/*
  Method to generate the life object at different locations
  of the canvas based on a random number that determines if the 
  life should be generated or not
*/
Life.prototype.generate = function() {
  // Create a random y coordinate
  do {
    var randomY = Math.floor((Math.random() * 4) + 1);
    if (randomY == 1) {
      this.y = 300;
    } else if (randomY == 2) {
      this.y = 220;
    } else if (randomY == 3) {
      this.y = 140;
    } else if (randomY == 4) {
      this.y = 60;
    }

    // Create a random x coordinate
    var randomX = Math.floor((Math.random() * 8) + 1);
    if (randomX == 1) {
      this.x = 1;
    } else if (randomX == 2) {
      this.x = 101;
    } else if (randomX == 3) {
      this.x = 201;
    } else if (randomX == 4) {
      this.x = 301;
    } else if (randomX == 5) {
      this.x = 401;
    } else if (randomX == 6) {
      this.x = 501;
    } else if (randomX == 7) {
      this.x = 601;
    } else if (randomX == 8) {
      this.x = 701;
    }
  } while (((player.x == this.x) && (player.y == this.y)) && ((gem.x == this.x) && (gem.y == this.y)));
}

// Draw Gem's new position
Life.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Life.prototype.remove = function() {
  this.x = -500;
  this.y = -500;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
// Create a Gem
var gem = new Gem();
gem.generate();
var life = new Life();

// set the gameOver variable to false
var gameOver = false;

// create 3 enemy objects
for (var x = 1; x <= 7; x++) {
  // create an enemy with a random speed already defined in the class definition.
  var enemy1 = new Enemy();
  // configure enemy to determine its x and y co-ordinates
  enemy1.configureEnemy();
  // push each configured enemy into the array
  allEnemies.push(enemy1);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        71: 'g',
        79: 'o'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

/*
  Function that gets called every time the game engine redraws the enemy bug
  image so as to check for the collision of the player and enemy bug object
  x and y co-ordinates.
*/
function checkCollisions(enemy, player) {
  if (godMode) {
    return;
  }
   // check if both objects have the same y co-ordinate
  if(enemy.y === player.y) {
    // check if the player.x co-ordinate is within a range of the enemy-bug.x co-ordinate because the enemy co-ordinate will mostly be a float point value, so checking for range is the safest means of checking for collision
    if ((player.x <= enemy.x + 75) && (player.x >= enemy.x - 40)) {
      // play bugDeathSound audio effect
      if (bugDeathSound) {
        bugDeathSound.currentTime = 0;
        bugDeathSound.play();
      }
      // if collision occurs, then reset the player object's co-ordinates to default.
      player.x = 401;
      player.y = 380;

      evaluateLife(); // call the evaluateLife() function to handle player's life processing
    }
  }
}

/* Function that evaluates the player's lives.
  Works by checking first if the innerHTML of the target span
  with id 'lives' is above '0', then deducts '1' from the value
  returned by the innerHTML of the 'live' HTML element

  The evaluateLife() function is called after every impact is triggerd by
  the checkCollisions() function.
*/
function evaluateLife() {
  if (godMode) {
    return;
  }
  if (document.getElementById('lives').innerHTML > 0) {
    document.getElementById('lives').innerHTML = document.getElementById('lives').innerHTML - 1;
    // loop through all Enemy object and reconfigure them
    for (var x in allEnemies) {
      allEnemies[x].configureEnemy();
    }
    gem.generate(); // regenerate the gem in a different location
  } else {
    // Else if the innerHTML returns 0 or less
    allEnemies = []; // then the allEnemies array is reinitialized to an empty array to stop the movement of the enemies on the canvas
    // reset the gem co-ordinates
    gem.x = -200;
    gem.y = -200;
    gameOver = true; // sets the gameOver variable to true to indicate that the game is over and the player object shouldn't respond to any event again.
    document.getElementById('live-scores-level-div').innerHTML = '<a href="#" onclick="location.reload()">Replay</a>' + '<br />You got ' + document.getElementById('scores').innerHTML + ' points.'; // display a message telling the user to try the game again
  }
}

/*
  Function that gets invoked each time the keyup event is fired
  to check if the co-ordinates of both the player object and gem object match.
  If they match, the gem.generate() method will be called to redraw the gem in another
  location on the canvas. Points will also be added.
*/
function gemCollected(player, gem) {
  // check if x and y co-ordinates collide
  if ((player.x == gem.x) && (player.y == gem.y)) {
    // play gemPickerSound audio effect
    if (gemPickerSound) {
      gemPickerSound.currentTime = 0;
      gemPickerSound.play();
    }
    gem.generate();
    evaluateScores();
  }
}

function lifeCollected(player, life) {
  // check if x and y co-ordinates collide
  if ((player.x == life.x) && (player.y == life.y)) {
    life.remove();
    addLife();
  }
}

/* The evaluateScore() function is called from the gemCollected() method
  and all it does is to increase the socres of the user's player and also
  invoke the evaluateLevel() function based on a condition evaluation
*/
function evaluateScores() {
  document.getElementById('scores').innerHTML = parseInt(document.getElementById('scores').innerHTML) + 30;
  if (parseInt(document.getElementById('scores').innerHTML) % 300 == 0) {
    evaluateLevel(); // call the evaluateLevel() function to increase the level after every 450 points
  }
}

/*
  Function to perform some simple housekeeping tasks like:
  extra-life generation and level up display
*/
function evaluateLevel() {
  for (var x in allEnemies) {
    allEnemies[x].speed = allEnemies[x].speed + 50;
  }
  // generate a random number to generate randomly try to generate a life
  var randLife = Math.floor((Math.random() * 100) + 1);
  // check if random number generated is within a range. If it is, generate a life
  if (randLife > 90) {
    life.generate(); // generate the life
  }
  document.getElementById('level').innerHTML = parseInt(document.getElementById('level').innerHTML) + 1;
  if (levelSound) {
    levelSound.currentTime = 0;
    levelSound.play();
  }

  // always give 1 life if level is multiple of 5
  if (document.getElementById('level').innerHTML % 5 == 0) {
    life.generate();
  }  
}

function addLife() {
  document.getElementById('lives').innerHTML = parseInt(document.getElementById('lives').innerHTML) + 1;
}

/*
  Function to change gem location in case of collision with bug
*/
function gemBugCollision(enemy, gem) {
  if(enemy.y === gem.y) {
    // check if the gem.x co-ordinate is within a range of the enemy-bug.x co-ordinate because the enemy co-ordinate will mostly be a float point value, so checking for range is the safest means of checking for collision
    if ((gem.x <= enemy.x + 75) && (gem.x >= enemy.x - 40)) {
      // if collision occurs, regenerate the gem
      gem.generate();
    }
  }
}