const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.lastTime = 0;
  this.difficulty = 0;
  this.powerToggle = false;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (currentTime) {
  if (currentTime >= this.lastTime + 4000){
    this.powerToggle = this.powerToggle ? false : true;
    if (this.powerToggle){
      this.game.addPowerUp();
    }
    this.lastTime = currentTime;
    this.game.addPlip();
    this.game.difficulty += 1;
  }
  let random = Math.random();
  if (random <= (this.game.difficulty * .0002)){
    this.game.addPlip();
  }


  let id = requestAnimationFrame(this.animate.bind(this));
  this.game.step(this.ctx);
  this.game.draw(this.ctx);
  if (this.game.isOver()){
    cancelAnimationFrame(id);
    $('canvas').toggleClass('hide');
    $('.extraScreen').toggleClass('hide');
    $('.score').text(`Your Score: ${this.game.score}`);
    $('.game-over').toggleClass('hide');
  }
};

GameView.prototype.bindKeyHandlers = function () {
  let paddle = this.game.paddle;
  key("left", function () { paddle.move("left") });
  key("down", function () { paddle.move("down") });
  key("right", function () { paddle.move("right") });
};


module.exports = GameView;
