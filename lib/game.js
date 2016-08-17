const Plip = require('./plip');

const Game = function() {
  this.DIM_X = 500;
  this.DIM_Y = 500;
  this.plips = this.addPlips();
};

Game.prototype.addPlips = () => {
  this.plips.push(new Plip());
};

Game.prototype.draw = (ctx) => {
  ctx.clearRect(0, 0, 500, 500);
  this.plips.forEach( plip => {
    plip.draw(ctx);
  });
};

Game.prototype.movePlips = () => {
  this.plips.forEach( plip => {
    plip.move();
  });
};

module.exports = Game;
