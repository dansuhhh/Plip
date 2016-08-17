const Plip = function() {
  this.color = "red";
  this.radius = 8;
  this.position = [0,30];
  this.vel = [2,1];
};

Plip.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.position[0], this.position[1], this.radius,  0, 2 * Math.PI, true);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
};

Plip.prototype.move = function() {
  this.vel[1] += .4;
  this.position[0] += this.vel[0];
  this.position[1] += this.vel[1];
};


module.exports = Plip;
