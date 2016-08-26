
const PowerUpNotice = function(id, powerup) {
  this.id = id;
  this.color = powerup.color;
  this.initY = powerup.position[1];
  this.position = [powerup.position[0], powerup.position[1]];
  this.power = powerup.power;
  this.velY = .5;
};

PowerUpNotice.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.font = "20px baloo da";
  ctx.fillStyle = `${this.color}`;
  ctx.strokeText(`${this.power}`, this.position[0], this.position[1], 400);
  ctx.fillText(`${this.power}`, this.position[0], this.position[1], 400);
  ctx.closePath();
};

PowerUpNotice.prototype.move = function() {
  this.position[1] -= this.velY;
};


PowerUpNotice.prototype.fade = function () {
  if (this.position[1] <= (this.initY - 20)){
    return true;
  }
  return false;
};


module.exports = PowerUpNotice;
