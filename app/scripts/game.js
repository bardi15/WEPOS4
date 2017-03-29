window.Game = (function () {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */

	var PIPECOUNT = 4;
	var MUTE = false;
	var Game = function (el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipes = new window.Pipes(this.el.find('.Pipes'), this);
		this.pipesArr = [];
		for (var i = 0; i < PIPECOUNT; i++) {
			this.pipesArr.push(new window.Pipes(this.el.find('.pipe' + (i + 1)), this));
		}
		this.counter = 0;
		this.isPlaying = false;
		this.px = 0;
		this.py = 0;
		this.gameScore = 0;

		this.onFrame = this.onFrame.bind(this);
		var that = this;
		this.el.find('.Mute').click(function () {
			if (MUTE) {
				that.el.find('audio').prop('muted', false);
				that.el.find('.Mute').css({'background-image' : 'url(../images/mute.png)'});
				MUTE = false;
			} else {
				that.el.find('audio').prop('muted', true);
				that.el.find('.Mute').css({'background-image' : 'url(../images/play.png)'});
				MUTE = true;
			}

		});
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function () {
		this.px += 1;
		this.py += 1;
		if (!this.isPlaying) {
			return;
		}
		var now = +new Date() / 1000,
			delta = now - this.lastFrame;
		this.lastFrame = now;


		this.player.onFrame(delta);
		this.el.find('.Current').text(this.gameScore);
		for (var i = 0; i < PIPECOUNT; i++) {
			var cPipe = this.pipesArr[i].onFrame(this.player.pos, i + 1);
			if (cPipe === 'failure') {
				return this.gameover();
			}
		}
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

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function () {
		this.player.reset();
		for (var i = 0; i < PIPECOUNT; i++) {
			this.pipesArr[i].reset(i + 1);
		}
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function () {
		return;
		this.isPlaying = false;
		this.el.find('#sound_die').get(0).play();

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
	Game.prototype.SPEED = 1;
	Game.prototype.STORYLENGTH = 33.6;
	Game.prototype.WIGGLE = 1;


	return Game;
})();


