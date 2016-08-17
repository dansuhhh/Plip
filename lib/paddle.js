const Paddle = function() {
  this.position = [200,500];
};

Paddle.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.fillRect(this.position[0], this.position[1], 200, 10);
  ctx.fill();
  ctx.closePath();
};


module.exports = Paddle;
