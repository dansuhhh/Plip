const Extras = function() {
  const canvas = document.getElementsByTagName("canvas")[1];
  this.ctx = canvas.getContext("2d");
}

Extras.prototype.drawBounceScore = function (plip) {
    this.ctx.beginPath();
    this.ctx.font = "10px baloo da";
    this.ctx.fillStyle = "#36454f";
    this.ctx.strokeText("blah", 200, 500, 400);
    this.ctx.closePath();
};

module.exports = Extras;







module.exports = Extras;
