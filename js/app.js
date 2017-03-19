// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    /**pick one of the three rows of roads randomly**/
    this.y = 60 + Math.floor(Math.random() * 3) * 82;
    /**speed varies slightly by enemy so that enemies finish crossing
       at different times and new enemies show up in uneven intervals**/
    this.speed = 200 + Math.floor(Math.random() * 3) * 30;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(origin) {
    /**If Player collides with enemy (front or back) or reaches the water, as
       evaluated in main(), Player returns to the initial position. Otherwise
       Player stays where Player has been moved to via keyboard input.*/
    if (origin == 1) {
      this.x = 200;
      this.y = 400;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**Takes keyboard input from document.addEventListner and moves the Player
  accordingly unless the player as a result goes off the canvas*/
Player.prototype.handleInput = function (key) {
    if (key === 'left') {
      this.x = Math.max(0, this.x - 100);
    } else if (key === 'right') {
      this.x = Math.min(400, this.x + 100);
    } else if (key === 'up') {
      this.y = Math.max(-28, this.y - 82);
    } else if (key === 'down') {
      this.y = Math.min(382, this.y + 82);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
/**Only three instances of Enemy are created at the very beginnig of the game
   but up to 5 enemies are allowed at any moment in the update process*/
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
