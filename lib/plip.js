const Plip = function() {
  this.color = "red";
  this.radius = 2;
  this.position = [20,20];
  this.vel = [5,5];
};

Plip.prototype.draw = (ctx) => {
  ctx.beginPath();
  ctx.arc(this.position[0], this.position[1], 5, 5, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
};

Plip.prototype.move = () => {
  let gravity = 0.5;
  this.vel[1] -= 0.5;
  this.position[0] += this.vel[0];
  this.position[1] += this.vel[1];
};


module.exports = Plip;
