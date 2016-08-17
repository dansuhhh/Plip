const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  setInterval( () => {
    this.game.draw(this.ctx);
    this.game.movePlips();
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  let paddle = this.game.paddle;
  key("left", function () { paddle.move("left") });
  key("right", function () { paddle.move("right") });
};


module.exports = GameView;
