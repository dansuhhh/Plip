/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementsByTagName("canvas")[0];
	  const ctx = canvas.getContext("2d");
	
	  $('.start').click( () => {
	    $('canvas').toggleClass('hide');
	    $('.main-menu').toggleClass('hide');
	    const game = new Game();
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
	    gameView.start();
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Plip = __webpack_require__(2);
	const Paddle = __webpack_require__(5);
	const PowerUp = __webpack_require__(7);
	
	const Game = function() {
	  this.DIM_X = 600;
	  this.DIM_Y = 600;
	  let initialPlipId = Math.random();
	  this.plips = { initialPlipId: new Plip(initialPlipId) };
	  this.paddle = new Paddle();
	  this.lives = 3;
	  this.score = 0;
	  this.difficulty = 0;
	  this.streak = 0;
	  this.powerups = [];
	};
	
	Game.prototype.addPlip = function() {
	  let plipId = Math.random();
	  this.plips[plipId] = new Plip(plipId);
	};
	
	Game.prototype.addPowerUp = function () {
	  this.powerups.push(new PowerUp());
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.drawScore(ctx);
	  this.drawLives(ctx);
	  this.paddle.draw(ctx);
	  Object.keys(this.plips).forEach( plipId => {
	    this.plips[plipId].draw(ctx);
	  });
	  this.powerups.forEach( powerup => {
	    powerup.draw(ctx);
	  });
	};
	
	Game.prototype.drawScore = function (ctx) {
	  ctx.beginPath();
	  ctx.font = "48px baloo da";
	  ctx.fillStyle = "#36454f";
	  ctx.strokeText(`${Math.floor(this.score)}`, 290, 100, 400)
	  ctx.fillText(`${Math.floor(this.score)}`, 290, 100, 400)
	  ctx.closePath();
	};
	
	Game.prototype.drawLives = function (ctx) {
	    for (let i = 0; i < this.lives; i++){
	      ctx.fillStyle = "#36454f";
	      ctx.beginPath();
	      ctx.arc(580 - (i * 30), 20, 10,  0, 2 * Math.PI, true);
	      ctx.fill();
	      ctx.closePath();
	    }
	};
	
	// Game.prototype.drawBounceScore = function (ctx, plip) {
	//   let count = 0;
	//
	//   let x = setInterval( ()=>{
	//     if (count >= 500){
	//       clearInterval(x);
	//     }
	//     ctx.beginPath();
	//     ctx.font = "10px baloo da";
	//     ctx.fillStyle = "#36454f";
	//     ctx.strokeText("blah", 200, 500, 400);
	//     ctx.closePath();
	//     count++;
	//   }, 500);
	// };
	
	Game.prototype.movePlips = function() {
	  Object.keys(this.plips).forEach( plipId => {
	    this.plips[plipId].move();
	  });
	};
	
	Game.prototype.movePowerUps = function () {
	  this.powerups.forEach( powerup => {
	    powerup.move();
	  });
	};
	
	Game.prototype.checkPlips = function (ctx) {
	  Object.keys(this.plips).forEach( plipId => {
	    if (this.plips[plipId].paddled(this.paddle)) {
	      // this.drawBounceScore(ctx, this.plips[plipId]);
	      this.score += Math.pow(2, Math.floor(this.streak / 4));
	      this.streak += 1;
	    } else if (this.plips[plipId].fallen()){
	      delete this.plips[plipId];
	      this.streak = 0;
	      this.lives -= 1;
	    } else if (this.plips[plipId].out()) {
	      delete this.plips[plipId];
	    }
	  });
	};
	
	Game.prototype.checkPowerUps = function (ctx) {
	  this.powerups.forEach( powerup => {
	    if (powerup.paddled(this.paddle)) {
	      this.applyPowerUp(powerup);
	      delete this.powerups[this.powerups.indexOf(powerup)];
	    }
	  });
	};
	
	Game.prototype.applyPowerUp = function (powerup) {
	  
	};
	
	Game.prototype.isOver = function () {
	  if (this.lives <= 0){
	    return true;
	  }
	  return false;
	};
	
	Game.prototype.step = function (ctx) {
	  this.movePlips();
	  this.movePowerUps();
	  this.checkPlips(ctx);
	  this.checkPowerUps(ctx);
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const COLORS = __webpack_require__(8);
	const SOUNDS = __webpack_require__(9);
	
	const Plip = function(id) {
	  this.id = id;
	  this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
	  this.radius = 8;
	  this.position = [0, 30];
	  this.vel = [1, 1];
	};
	
	Plip.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(this.position[0], this.position[1], this.radius,  0, 2 * Math.PI, true);
	  ctx.closePath();
	  ctx.fill();
	};
	
	Plip.prototype.move = function() {
	  this.vel[1] += .1;
	
	  this.position[0] += this.vel[0];
	  this.position[1] += this.vel[1];
	};
	
	Plip.prototype.paddled = function (paddle) {
	  if (this.position[1] <= 525){
	    return false;
	  }
	
	  let plipLowerEdge = this.position[1] + (this.radius / 2);
	  let paddleUpperEdge = paddle.position[1] + paddle.height;
	  if ((plipLowerEdge <= paddleUpperEdge) &&
	    (this.position[0] > paddle.position[0]) &&
	    (this.position[0] < paddle.position[0] + paddle.width)) {
	    SOUNDS[Math.floor(Math.random() * SOUNDS.length)].play();
	    let random = Math.random();
	    if (random <= 0.25){
	      this.vel[0] = 1.5;
	      this.vel[1] = -7;
	    } else if (random <= .5){
	      this.vel[0] = 1.33;
	      this.vel[1] = -8;
	    } else if (random <= .75){
	      this.vel[0] = 1.16;
	      this.vel[1] = -9;
	    } else {
	      this.vel[0] = 1;
	      this.vel[1] = -10;
	    }
	    return true;
	  } else {
	    return false;
	  }
	};
	
	Plip.prototype.fallen = function () {
	  if (this.position[1] >= 560){
	    return true;
	  }
	  return false;
	};
	
	Plip.prototype.out = function () {
	  if (this.position[0] >= 600){
	    return true;
	  }
	  return false;
	};
	
	
	module.exports = Plip;


/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const COLORS = __webpack_require__(8);
	
	const PowerUp = function(id) {
	  this.id = id;
	  this.sideLength = 15;
	  this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
	  this.position = [300, 30];
	  this.vel = [0, 1];
	
	};
	
	PowerUp.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.strokeRect(this.position[0],this.position[1],this.sideLength, this.sideLength);
	  ctx.closePath();
	  ctx.fill();
	};
	
	PowerUp.prototype.move = function() {
	  this.position[1] += this.vel[1];
	};
	
	PowerUp.prototype.paddled = function (paddle) {
	  if (this.position[1] <= 525){
	    return false;
	  }
	
	  let powerUpLowerEdge = this.position[1] + (this.sideLength / 2);
	  let paddleUpperEdge = paddle.position[1] + paddle.height;
	  if ((powerUpLowerEdge <= paddleUpperEdge) &&
	    (this.position[0] > paddle.position[0]) &&
	    (this.position[0] < paddle.position[0] + paddle.width)) {
	      return true;
	  }
	};
	
	
	
	
	module.exports = PowerUp;


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = [
	  "blue",
	  "red",
	  "black",
	  "green",
	  "orange",
	  "purple",
	  "brown"
	]


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = [
	  new Audio("assets/sounds/boop1.wav"),
	  new Audio("assets/sounds/boop2.wav"),
	  new Audio("assets/sounds/boop3.wav")
	];


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map