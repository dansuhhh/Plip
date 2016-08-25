const COLORS = require('./constants/color_constants');

const PowerUp = function(id) {
  this.id = id;
  this.sideLength = 15;
  this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  this.position = [300, 30];
  this.vel = [0, 1];

};

PowerUp.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.strokeRect(this.position[0],this.position[1],this.sideLength, this.sideLength);
  ctx.closePath();
  ctx.fill();
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
