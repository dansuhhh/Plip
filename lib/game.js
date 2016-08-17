const Plip = require('./plip');

const Game = function() {
  this.DIM_X = 590;
  this.DIM_Y = 590;
  this.plips = [];
  this.addPlips();
};

Game.prototype.addPlips = function() {
  this.plips.push( new Plip() );
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 590, 590);
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
