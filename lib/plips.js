const Game = require('./game');
const GameView = require('./gameview');
const Extras = require('./extras');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");

  $('.start').click( () => {
    $('canvas').toggleClass('hide');
    $('.main-menu').toggleClass('hide');
    const game = new Game();
    const extras = new Extras();
    const gameView = new GameView(game, ctx);
    gameView.start();
  });

  $('.instructions').click( () => {
    $('.instruction-menu').toggleClass('hide');
    $('.main-menu').toggleClass('hide');
  });

  $('.restart').click( () => {
    $('canvas').toggleClass('hide');
    $('.game-over').toggleClass('hide');
    const game = new Game();
    const gameView = new GameView(game, ctx);
    const extras = new Extras();
    gameView.start();
  });
});
