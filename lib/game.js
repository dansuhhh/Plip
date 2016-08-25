const Plip = require('./plip');
const Paddle = require('./paddle');
const PowerUp = require('./powerup');

const Game = function() {
  this.DIM_X = 600;
  this.DIM_Y = 600;
  let initialPlipId = Math.random();
  this.plips = { initialPlipId: new Plip(initialPlipId) };
  this.paddle = new Paddle();
  this.lives = 3;
  this.score = 0;
  this.difficulty = 0;
  this.streak = 0;
  this.powerups = [];
};

Game.prototype.addPlip = function() {
  let plipId = Math.random();
  this.plips[plipId] = new Plip(plipId);
};

Game.prototype.addPowerUp = function () {
  this.powerups.push(new PowerUp());
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.drawScore(ctx);
  this.drawLives(ctx);
  this.paddle.draw(ctx);
  Object.keys(this.plips).forEach( plipId => {
    this.plips[plipId].draw(ctx);
  });
  this.powerups.forEach( powerup => {
    powerup.draw(ctx);
  });
};

Game.prototype.drawScore = function (ctx) {
  ctx.beginPath();
  ctx.font = "48px baloo da";
  ctx.fillStyle = "#36454f";
  ctx.strokeText(`${Math.floor(this.score)}`, 290, 100, 400)
  ctx.fillText(`${Math.floor(this.score)}`, 290, 100, 400)
  ctx.closePath();
};

Game.prototype.drawLives = function (ctx) {
    for (let i = 0; i < this.lives; i++){
      ctx.fillStyle = "#36454f";
      ctx.beginPath();
      ctx.arc(580 - (i * 30), 20, 10,  0, 2 * Math.PI, true);
      ctx.fill();
      ctx.closePath();
    }
};

// Game.prototype.drawBounceScore = function (ctx, plip) {
//   let count = 0;
//
//   let x = setInterval( ()=>{
//     if (count >= 500){
//       clearInterval(x);
//     }
//     ctx.beginPath();
//     ctx.font = "10px baloo da";
//     ctx.fillStyle = "#36454f";
//     ctx.strokeText("blah", 200, 500, 400);
//     ctx.closePath();
//     count++;
//   }, 500);
// };

Game.prototype.movePlips = function() {
  Object.keys(this.plips).forEach( plipId => {
    this.plips[plipId].move();
  });
};

Game.prototype.movePowerUps = function () {
  this.powerups.forEach( powerup => {
    powerup.move();
  });
};

Game.prototype.checkPlips = function (ctx) {
  Object.keys(this.plips).forEach( plipId => {
    if (this.plips[plipId].paddled(this.paddle)) {
      // this.drawBounceScore(ctx, this.plips[plipId]);
      this.score += Math.pow(2, Math.floor(this.streak / 4));
      this.streak += 1;
    } else if (this.plips[plipId].fallen()){
      delete this.plips[plipId];
      this.streak = 0;
      this.lives -= 1;
    } else if (this.plips[plipId].out()) {
      delete this.plips[plipId];
    }
  });
};

Game.prototype.checkPowerUps = function (ctx) {
  this.powerups.forEach( powerup => {
    if (powerup.paddled(this.paddle)) {
      this.applyPowerUp(powerup);
      delete this.powerups[this.powerups.indexOf(powerup)];
    }
  });
};

Game.prototype.applyPowerUp = function (powerup) {
  
};

Game.prototype.isOver = function () {
  if (this.lives <= 0){
    return true;
  }
  return false;
};

Game.prototype.step = function (ctx) {
  this.movePlips();
  this.movePowerUps();
  this.checkPlips(ctx);
  this.checkPowerUps(ctx);
};

module.exports = Game;
