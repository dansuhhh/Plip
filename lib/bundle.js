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
	const GameView = __webpack_require__(8);
	const Extras = __webpack_require__(9);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvas = document.getElementsByTagName("canvas")[0];
	  const ctx = canvas.getContext("2d");
	
	  $('.start').click( () => {
	    $('canvas').toggleClass('hide');
	    $('.extraScreen').toggleClass('hide');
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
	    $('.extraScreen').toggleClass('hide');
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
	const PowerUp = __webpack_require__(6);
	const Extras = __webpack_require__(9);
	
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
	  this.extras = new Extras();
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
	  let posOffset = 0;
	  if (this.score > 9){
	    posOffset = (this.score.toString().length - 1) * 10;
	  }
	
	  ctx.beginPath();
	  ctx.font = "48px baloo da";
	  ctx.fillStyle = "#36454f";
	  ctx.strokeText(`${Math.floor(this.score)}`, 290 - posOffset, 100, 400)
	  ctx.fillText(`${Math.floor(this.score)}`, 290 - posOffset , 100, 400)
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
	      let points = Math.pow(2, Math.floor(this.streak / 4));
	      this.extras.addBounceScore(this.plips[plipId], points);
	      this.score += points;
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
	      delete this.powerups[this.powerups.indexOf(powerup)];
	      this.applyPowerUp(ctx, powerup);
	      this.extras.addPowerUpNotice(powerup);
	    }
	  });
	};
	
	Game.prototype.applyPowerUp = function (ctx, powerup) {
	  switch (powerup.power){
	    case "2x":
	      this.streak += 4;
	      break;
	  }
	};
	
	Game.prototype.isOver = function () {
	  if (this.lives <= 0){
	    this.extras.end();
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

	const COLORS = __webpack_require__(3);
	const SOUNDS = __webpack_require__(4);
	
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
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	module.exports = [
	  new Audio("assets/sounds/boop1.wav"),
	  new Audio("assets/sounds/boop2.wav"),
	  new Audio("assets/sounds/boop3.wav")
	];


/***/ },
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
/***/ function(module, exports, __webpack_require__) {

	const COLORS = __webpack_require__(3);
	const POWERS = __webpack_require__(7);
	
	const PowerUp = function(id) {
	  this.id = id;
	  this.sideLength = 15;
	  this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
	  this.position = [this.randomX(), 30];
	  this.vel = [0, 1];
	  this.power = POWERS[Math.floor(Math.random() * POWERS.length )];
	};
	
	PowerUp.prototype.randomX = function () {
	  let rand = Math.random();
	  if (rand < .33){
	    return 100;
	  } else if (rand < .66){
	    return 300;
	  } else {
	    return 500;
	  }
	};
	
	PowerUp.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(this.position[0], this.position[1], 9,  0, 2 * Math.PI, true);
	  ctx.closePath();
	  ctx.fill();
	
	  ctx.beginPath();
	  ctx.font = "12px baloo da";
	  ctx.fillStyle = "white";
	  ctx.strokeText(`${this.power}`, this.position[0] - 6, this.position[1] + 4, 400);
	  ctx.fillText(`${this.power}`, this.position[0] - 6, this.position[1] + 4, 400);
	  ctx.closePath();
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
/* 7 */
/***/ function(module, exports) {

	module.exports = [
	  "2x"
	]


/***/ },
/* 8 */
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const BounceScore = __webpack_require__(10);
	const PowerUpNotice = __webpack_require__(11);
	
	const Extras = function() {
	  const canvas = document.getElementsByTagName("canvas")[1];
	  this.ctx = canvas.getContext("2d");
	  this.off = false;
	  this.bounceScores = {};
	  this.powerupNotices = {};
	  requestAnimationFrame(this.animate.bind(this));
	}
	
	Extras.prototype.animate = function (currentTime) {
	  this.ctx.clearRect(0, 0, 600, 600);
	  this.move();
	  this.checkBounceScores();
	  this.checkPowerUpNotices();
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
	  Object.keys(this.powerupNotices).forEach( powerupId => {
	    this.powerupNotices[powerupId].move();
	  });
	};
	
	Extras.prototype.checkBounceScores = function () {
	  Object.keys(this.bounceScores).forEach( bounceScoreId => {
	    if (this.bounceScores[bounceScoreId].fade()){
	      delete this.bounceScores[bounceScoreId];
	    }
	  });
	};
	
	Extras.prototype.checkPowerUpNotices = function () {
	  Object.keys(this.powerupNotices).forEach( powerupId => {
	    if (this.powerupNotices[powerupId].fade()){
	      delete this.powerupNotices[powerupId];
	    }
	  });
	};
	
	Extras.prototype.draw = function () {
	  Object.keys(this.bounceScores).forEach( bounceScoreId => {
	    this.bounceScores[bounceScoreId].draw(this.ctx);
	  });
	  Object.keys(this.powerupNotices).forEach( powerupId => {
	    this.powerupNotices[powerupId].draw(this.ctx);
	  });
	};
	
	Extras.prototype.addBounceScore = function (plip, points) {
	  let bsId = Math.random();
	  this.bounceScores[bsId] = new BounceScore(bsId, plip, points);
	};
	
	Extras.prototype.addPowerUpNotice = function (powerup) {
	  let id = Math.random();
	  this.powerupNotices[id] = new PowerUpNotice(id, powerup);
	};
	
	
	Extras.prototype.end = function () {
	  this.off = true;
	};
	
	module.exports = Extras;


/***/ },
/* 10 */
/***/ function(module, exports) {

	
	const BounceScore = function(id, plip, points) {
	  this.id = id;
	  this.color = plip.color;
	  this.initY = plip.position[1];
	  this.position = [plip.position[0], plip.position[1]];
	  this.points = points;
	  this.velY = .5;
	};
	
	BounceScore.prototype.draw = function(ctx) {
	  ctx.beginPath();
	  ctx.font = "14px baloo da";
	  ctx.fillStyle = `${this.color}`;
	  ctx.strokeText(`${this.points}`, this.position[0], this.position[1], 400);
	  ctx.fillText(`${this.points}`, this.position[0], this.position[1], 400);
	  ctx.closePath();
	};
	
	BounceScore.prototype.move = function() {
	  this.position[1] -= this.velY;
	};
	
	
	BounceScore.prototype.fade = function () {
	  if (this.position[1] <= (this.initY - 20)){
	    return true;
	  }
	  return false;
	};
	
	
	module.exports = BounceScore;


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	const PowerUpNotice = function(id, powerup) {
	  this.id = id;
	  this.color = powerup.color;
	  this.initY = powerup.position[1];
	  this.position = [powerup.position[0], powerup.position[1]];
	  this.power = powerup.power;
	  this.velY = .5;
	};
	
	PowerUpNotice.prototype.draw = function(ctx) {
	  ctx.beginPath();
	  ctx.font = "20px baloo da";
	  ctx.fillStyle = `${this.color}`;
	  ctx.strokeText(`${this.power}`, this.position[0], this.position[1], 400);
	  ctx.fillText(`${this.power}`, this.position[0], this.position[1], 400);
	  ctx.closePath();
	};
	
	PowerUpNotice.prototype.move = function() {
	  this.position[1] -= this.velY;
	};
	
	
	PowerUpNotice.prototype.fade = function () {
	  if (this.position[1] <= (this.initY - 20)){
	    return true;
	  }
	  return false;
	};
	
	
	module.exports = PowerUpNotice;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map