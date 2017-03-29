window.Player = (function () {
	'use strict';

	var Controls = window.Controls;

	var INITIAL_POSITION_X = 10;
	var INITIAL_POSITION_Y = 25;
	var FALLTIME = 1000;

	var Player = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.gameStarted = false;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.el.removeAttr('style');
	};

	Player.prototype.onFrame = function () {
		this.pos.y = this.getBirdHeight();
		if (Controls._didJump) {
			this.gameStarted = true;
			Controls._didJump = false;
			this.game.el.find('#sound_wing').get(0).play();
			this.birdFlap();
		}
		this.checkCollisionWithBounds();
	};
	Player.prototype.birdFlap = function () {
		var that = this;
		that.el.css('transform', 'rotate(-20deg)');
		that.el.stop().animate({
			bottom: '+=3em'
		}, 200, function () {
			that.el.css('transform', 'rotate(0deg)');
			that.el.stop().animate({
				bottom: '-=3em'
			}, 300, 'linear', function () {
				that.drop();
			});
		});
	};
	Player.prototype.drop = function () {
		var totalFallTime = FALLTIME * (this.getBirdHeight() / this.game.WORLD_HEIGHT);
		this.el.css('transform', 'rotate(20deg)');
		this.el.stop().animate({
			bottom: '0'
		}, totalFallTime, 'linear');
	};
	Player.prototype.getBirdHeight = function () {
		return parseInt(this.el.css('bottom')) / 10; // because em
	};

	Player.prototype.checkCollisionWithBounds = function () {
		if (this.gameStarted) {
			if (this.pos.y < this.game.WIGGLE || this.pos.y > this.game.WORLD_HEIGHT) {
				return this.game.gameover();
			}
		}
	};

	return Player;

})();
