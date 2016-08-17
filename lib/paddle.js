const Paddle = function() {
  this.position = [200,500];
};

Paddle.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.fillRect(this.position[0], this.position[1], 200, 10);
  ctx.fill();
  ctx.closePath();
};

Paddle.prototype.move = function (direction) {
  if (direction === "left") {
    if (this.position[0] != 0){
      this.position[0] -= 200;
    }
  } else {
    if (this.position[0] != 400){
      this.position[0] += 200;
    }
  }
};


module.exports = Paddle;
