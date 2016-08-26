const COLORS = require('./constants/color_constants');
const POWERS = require('./constants/powerup_constants');

const PowerUp = function(id) {
  this.id = id;
  this.sideLength = 15;
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  this.position = [this.randomX(), 30];
  this.vel = [0, 1];
  this.power = POWERS[Math.floor(Math.random() * POWERS.length )];
};

PowerUp.prototype.randomX = function () {
  let rand = Math.random();
  if (rand < .33){
    return 100;
  } else if (rand < .66){
    return 300;
  } else {
    return 500;
  }
};

PowerUp.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.position[0], this.position[1], 9,  0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.font = "12px baloo da";
  ctx.fillStyle = "white";
  ctx.strokeText(`${this.power}`, this.position[0] - 6, this.position[1] + 4, 400);
  ctx.fillText(`${this.power}`, this.position[0] - 6, this.position[1] + 4, 400);
  ctx.closePath();
};

PowerUp.prototype.move = function() {
  this.position[1] += this.vel[1];
};

PowerUp.prototype.paddled = function (paddle) {
  if (this.position[1] <= 525){
    return false;
  }

  let powerUpLowerEdge = this.position[1] + (this.sideLength / 2);
  let paddleUpperEdge = paddle.position[1] + paddle.height;
  if ((powerUpLowerEdge <= paddleUpperEdge) &&
    (this.position[0] > paddle.position[0]) &&
    (this.position[0] < paddle.position[0] + paddle.width)) {
      return true;
  }
};




module.exports = PowerUp;
