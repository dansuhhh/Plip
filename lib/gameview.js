
const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  setInterval( () => {
    this.game.draw(this.ctx);
    this.game.movePlips();
  }, 20);
};

module.exports = GameView;
