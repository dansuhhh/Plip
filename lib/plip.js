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
  this.hasFallen();
  this.vel[1] += .4;
  this.position[0] += this.vel[0];
  this.position[1] += this.vel[1];
};

Plip.prototype.paddled = function (paddle) {
  if ()
};


module.exports = Plip;
