window.Game = (function () {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function (el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipes = new window.Pipes(this.el.find('.Pipes'), this);
		this.ground = new window.Ground(this.el.find('.Ground'), this);
		this.counter = 0;
		// this.landscape = new window.Landscape(this.el.find('.Landscape'), this);
		this.isPlaying = false;
		this.px = 0;
		this.py = 0;
		this.gameScore = 0;
		this.mute = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function () {
		this.px += 1;
		this.py += 1;
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}
		// console.log(this.canvas);
		//this.canvas.style.transform = "rotate(7deg)";
		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;
		// console.log();
		this.counter += 5;

		this.player.onFrame(delta);
		var z = this.pipes.onFrame(this.player.pos);
		this.ground.onFrame(delta);
		if (z === 'success') {
			this.gameScore += 1;
			this.playSound('sfx_point.ogg');
			this.el.find('.Current').text(this.gameScore);
		} else if (z === 'failure') {
			this.gameover();
		}
		this.el.find('.Mute').click(function () {
			this.mute = true;
		});
		// this.landscape.onFrame(delta);
		// Request next frame.
		this.el.css('transform', 'translateZ(0) translate(' + this.counter + 'em, ' + 0 + 'em)');
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function () {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	Game.prototype.playSound = function (sound) {
		if (this.mute) {
			return;
		} else {
			var audio = new Audio('../sounds/' + sound);
			audio.play();
		}
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function () {
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function () {
		this.isPlaying = false;
		// var audio = new Audio('../sounds/sfx_die.ogg');
		// audio.play();
		this.playSound('sfx_die.ogg');
		// Should be refactored into a Scoreboard class.

		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl.find('.score-value').text(this.gameScore);
		scoreboardEl
			.addClass('Scoreboard-is-visible')
			.find('.Scoreboard-restart')
			.one('click', function () {
				scoreboardEl.removeClass('Scoreboard-is-visible');
				that.start();
			});
		this.gameScore = 0;
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	Game.prototype.SPEED = 5;

	return Game;
})();


