const Game = require('./game');
const GameView = require('./gameview');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");

  $('.start-btn').click( () => {
    $('canvas').toggleClass('hide');
    $('.main-menu').toggleClass('hide');
    const game = new Game();
    const gameView = new GameView(game, ctx);
    gameView.start();
  });

  $('.restart-btn').click( () => {
    $('canvas').toggleClass('hide');
    $('.game-over').toggleClass('hide');
    const game = new Game();
    const gameView = new GameView(game, ctx);
    gameView.start();
  });
});
