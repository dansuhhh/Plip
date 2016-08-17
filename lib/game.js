const Plip = require('./plip');
const Paddle = require('./paddle');

const Game = function(paddle) {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.plips = [];
  this.paddle = new Paddle();
  this.addPlips();
};

Game.prototype.addPlips = function() {
  this.plips.push( new Plip() );
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 600, 600);
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

module.exports = Game;
