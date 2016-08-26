const BounceScore = require('./bounce_score');

const Extras = function() {
  const canvas = document.getElementsByTagName("canvas")[1];
  this.ctx = canvas.getContext("2d");
  this.off = false;
  this.bounceScores = {};
  requestAnimationFrame(this.animate.bind(this));
}

Extras.prototype.animate = function (currentTime) {
  this.ctx.clearRect(0, 0, 600, 600);
  this.move();
  this.checkBounceScores();
  this.draw();
  let id = requestAnimationFrame(this.animate.bind(this));
  if (this.off) {
    cancelAnimationFrame(id);
  }
};

Extras.prototype.move = function () {
  Object.keys(this.bounceScores).forEach( bounceScoreId => {
    this.bounceScores[bounceScoreId].move();
  });
};

Extras.prototype.checkBounceScores = function () {
  Object.keys(this.bounceScores).forEach( bounceScoreId => {
    if (this.bounceScores[bounceScoreId].fade()){
      delete this.bounceScores[bounceScoreId];
    }
  });
};

Extras.prototype.draw = function () {
  Object.keys(this.bounceScores).forEach( bounceScoreId => {
    this.bounceScores[bounceScoreId].draw(this.ctx);
  });
};

Extras.prototype.addBounceScore = function (plip, points) {
  let bsId = Math.random();
  this.bounceScores[bsId] = new BounceScore(bsId, plip, points);
};

Extras.prototype.end = function () {
  this.off = true;
};

module.exports = Extras;







module.exports = Extras;
