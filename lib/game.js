const Plip = require('./plip');
const Paddle = require('./paddle');

const Game = function() {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  this.plips = [ new Plip() ];
  this.paddle = new Paddle();
  this.lives = 3;
  this.score = 0;
  this.difficulty = 0;
};

Game.prototype.addPlip = function() {

};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.drawScore(ctx);
  this.drawLives(ctx);
  this.paddle.draw(ctx);
  this.plips.forEach( plip => {
    plip.draw(ctx);
  });
};

Game.prototype.drawScore = function (ctx) {
  ctx.beginPath();
  ctx.strokeText(`Score: ${Math.floor(this.score / 4)}`, 295, 100, 400)
  ctx.closePath();
};

Game.prototype.drawLives = function (ctx) {
  ctx.beginPath();
  ctx.strokeText(`Lives: ${this.lives}`, 295, 50, 400)
  ctx.closePath();
};

Game.prototype.movePlips = function() {
  this.plips.forEach( plip => {
    plip.move();
  });
};

Game.prototype.checkPlips = function () {
  this.plips.forEach( plip => {
    if (plip.paddled(this.paddle)) {
      this.score += 1;
    }
    if (plip.fallen()){
      let deadPlipIndex = this.plips.indexOf(plip)
      this.plips = this.plips.splice(deadPlipIndex, 0);
      this.lives -= 1;
    }
    if (plip.out()) {
      let deadPlipIndex = this.plips.indexOf(plip)
      this.plips = this.plips.splice(deadPlipIndex, 0);
    }
  });
};

Game.prototype.step = function () {
  this.addPlip();
  this.movePlips();
  this.checkPlips();
};

module.exports = Game;
