const Paddle = function() {
  this.position = [200,550];
  this.width = 200;
  this.height = 10;
};

Paddle.prototype.draw = function (ctx) {
  ctx.fillStyle = "#36454f";
  ctx.beginPath();
  ctx.fillRect(this.position[0], this.position[1], this.width, this.height);
  ctx.closePath();
  ctx.fill();
};

Paddle.prototype.move = function (direction) {
  switch (direction){
    case "left":
      this.position[0] = 0;
      break;
    case "down":
      this.position[0] = 200;
      break;
    case "right":
      this.position[0] = 400;
      break;
  }

  // if (direction === "left") {
  //   if (this.position[0] != 0){
  //     this.position[0] -= 200;
  //   }
  // } else {
  //   if (this.position[0] != 400){
  //     this.position[0] += 200;
  //   }
  // }
};


module.exports = Paddle;
