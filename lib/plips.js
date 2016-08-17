const Game = require('./game');
const GameView = require('./gameview');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);
  gameView.start();
});
