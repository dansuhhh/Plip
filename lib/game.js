const Plip = require('./plip');
const Paddle = require('./paddle');

const Game = function() {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.plips = [];
  this.paddle = new Paddle();
  this.chances = 3;
  this.addPlips();
};

Game.prototype.addPlips = function() {
  this.plips.push( new Plip() );
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.paddle.draw(ctx);
  this.plips.forEach( plip => {
    plip.draw(ctx);
  });
};

Game.prototype.movePlips = function() {
  this.plips.forEach( plip => {
    plip.move();
  });
};

Game.prototype.checkPaddles = function () {
  this.plips.forEach( plip => {
    if (!plip.safe(this.paddle)) {
      let deadPlipIndex = this.plips.indexOf(plip)
      this.plips = this.plips.splice(deadPlipIndex, 1);
      console.log("lose");
      this.chances -= 1;
      if (this.chances === 0) {
      }
    }
  });
};

Game.prototype.step = function () {
  this.movePlips();
  this.checkPaddles();
};

module.exports = Game;
