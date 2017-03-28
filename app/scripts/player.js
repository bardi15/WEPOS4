window.Player = (function () {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 15; // * 10 pixels per second
	var WIDTH = 4;
	var HEIGHT = 2.8;
	var INITIAL_POSITION_X = 10;
	var INITIAL_POSITION_Y = 25;
	var FALLTIME = 1000;
	// var canvas = document.getElementsByClassName('GameCanvas');

	var Player = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.nfo = false;
		this.gameStarted = false;
		// this.speed = this.game.SPEED * 10;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.el.removeAttr('style');
	};

	Player.prototype.onFrame = function (delta) {
		// this.pos.x = this.el.offset().left;
		if (this.getBirdHeight() < 3) {
			// console.log('dagner sine');
		}
		// this.birdFlap();
		if (Controls._didJump) {
			this.gameStarted = true;
			// console.log('_didJump ');
			// this.pos.y -= delta * SPEED + 3;
			Controls._didJump = false;
			this.game.playSound('sfx_wing.ogg');
			this.birdFlap();
			this.nfo = true;
		} else {
			// this.pos.y += delta * SPEED / 2;
			// console.log('down');
			// this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

		}
		this.checkCollisionWithBounds();
	};
	Player.prototype.birdFlap = function () {
		// console.log(this.el);
		// var eleven = this.el;
		var that = this;
		that.el.css('transform', 'rotate(-20deg)');
		that.el.stop().animate({
			bottom: '+=3em'
		}, 200, function () {
			// birdPos();
			// console.log(this.el);
			that.el.css('transform', 'rotate(0deg)');
			that.el.stop().animate({
				bottom: '-=3em'
			}, 300, 'linear', function () {
				// birdPos();
				that.drop();
			});
		});
	}
	Player.prototype.drop = function () {
		// var birdPercent = parseInt(this.el.css('bottom')) / this.game.WORLD_HEIGHT;
		var totalFallTime = FALLTIME * (this.getBirdHeight() / this.game.WORLD_HEIGHT);
		// console.log(birdPercent,totalFallTime);
		this.el.stop().animate({
			bottom: '0' // 172   //290 == to high  //310 virkar???  //285 JUST RIGHT TOP
		}, totalFallTime, 'linear');
	}
	Player.prototype.getBirdHeight = function () {
		// this.pos.y = parseInt(this.el.css('bottom')) / 10;
		// return this.pos.y / this.game.WORLD_HEIGHT;
		return parseInt(this.el.css('bottom')) / 10; // because em
	}

	Player.prototype.checkCollisionWithBounds = function () {
		if (this.gameStarted) {
			// console.log('checkCollisionWithBounds', this.pos.y, this.pos.x);
			// console.log(this.pos.y);
			if (this.pos.y < this.game.WIGGLE || this.pos.y > this.game.WORLD_HEIGHT - this.game.WIGGLE) {
				// return this.game.gameover();
			}
		}


		// if (this.pos.x < 0 ||
		// 	this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
		// 	this.pos.y < 0 ||
		// 	this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
		// 	console.log('over');
		// 	return this.game.gameover();
		// }
	};

	return Player;

})();
