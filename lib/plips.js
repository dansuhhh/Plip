const Game = require('./game');
const GameView = require('./gameview');
const Extras = require('./extras');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");

  $('.paddle-0').toggleClass('hide-paddle');
  $('.bottom-key-0').toggleClass('show-key');
  let paddleEl = 0;

  setInterval( ()=> {
    $(`.paddle-${paddleEl}`).toggleClass('hide-paddle');
    $(`.bottom-key-${paddleEl}`).toggleClass('show-key');
    if (paddleEl === 2) {
      paddleEl -= 2;
    } else {
      paddleEl += 1;
    }
    $(`.paddle-${paddleEl}`).toggleClass('hide-paddle');
    $(`.bottom-key-${paddleEl}`).toggleClass('show-key');
  }, 1500);

  $('.start').click( () => {
    $('canvas').toggleClass('hide');
    $('.extraScreen').toggleClass('hide');
    $('.main-menu').toggleClass('hide');
    const game = new Game();
    const gameView = new GameView(game, ctx);
    gameView.start();
  });

  $('.restart').click( () => {
    $('canvas').toggleClass('hide');
    $('.extraScreen').toggleClass('hide');
    $('.game-over').toggleClass('hide');
    const game = new Game();
    const gameView = new GameView(game, ctx);
    gameView.start();
  });
});
