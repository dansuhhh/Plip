const COLORS = require('./color_constants');

const Plip = function(id) {
  this.id = id;
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

Plip.prototype.paddled = function (paddle) {
  if (this.position[1] <= 525){
    return false;
  }

  let plipLowerEdge = this.position[1] + (this.radius / 2);
  let paddleUpperEdge = paddle.position[1] + paddle.height;
  if ((plipLowerEdge <= paddleUpperEdge) &&
    (this.position[0] > paddle.position[0]) &&
    (this.position[0] < paddle.position[0] + paddle.width)) {
    this.vel[1] = -20;
    return true;
  } else {
    return false;
  }
};

Plip.prototype.fallen = function () {
  if (this.position[1] >= 560){
    return true;
  }
  return false;
};

Plip.prototype.out = function () {
  if (this.position[0] >= 600){
    return true;
  }
  return false;
};


module.exports = Plip;
