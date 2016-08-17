const COLORS = require('./color_constants');

const Plip = function() {
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  this.radius = 8;
  this.position = [0,30];
  this.vel = [2,1];
};

Plip.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.position[0], this.position[1], this.radius,  0, 2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
};

Plip.prototype.move = function() {
  this.vel[1] += .4;
  this.position[0] += this.vel[0];
  this.position[1] += this.vel[1];
};

Plip.prototype.safe = function (paddle) {
  let plipLowerEdge = this.position[1] + (this.radius / 2);
  if (plipLowerEdge <= 530){
    return true;
  }
  let paddleUpperEdge = paddle.position[1];
  if ((plipLowerEdge <= paddleUpperEdge) &&
    (this.position[0] > paddle.position[0]) &&
    (this.position[0] < paddle.position[0] + paddle.width)) {
    this.vel[1] -= 10;
    return true;
  } else {
    return false;
  }
};


module.exports = Plip;
