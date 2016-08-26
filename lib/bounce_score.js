
const BounceScore = function(id, plip, points) {
  this.id = id;
  this.color = plip.color;
  this.initY = plip.position[1];
  this.position = [plip.position[0], plip.position[1]];
  this.points = points;
  this.velY = .5;
};

BounceScore.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.font = "14px baloo da";
  ctx.fillStyle = `${this.color}`;
  ctx.strokeText(`${this.points}`, this.position[0], this.position[1], 400);
  ctx.fillText(`${this.points}`, this.position[0], this.position[1], 400);
  ctx.closePath();
};

BounceScore.prototype.move = function() {
  this.position[1] -= this.velY;
};


BounceScore.prototype.fade = function () {
  if (this.position[1] <= (this.initY - 20)){
    return true;
  }
  return false;
};


module.exports = BounceScore;
