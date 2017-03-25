window.Player = (function () {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	// var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	// var canvas = document.getElementsByClassName('GameCanvas');

	var Player = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.speed = this.game.SPEED * 5;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function () {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function (delta) {
		// if (Controls.keys.right) {
		// 	this.pos.x += delta * SPEED;
		// }
		// if (Controls.keys.left) {
		// 	this.pos.x -= delta * SPEED;
		// }
		// if (Controls.keys.down) {
		// 	this.pos.y += delta * SPEED;
		// }
		if (Controls.keys.space) {
			this.pos.y -= delta * this.speed;
			this.el.addClass('Player-up');
			this.el.removeClass('Player-down');
		} else {
			this.pos.y += delta * this.speed;
			this.el.removeClass('Player-up');
			var downL = this.game.WORLD_HEIGHT - 25;
			console.log('downL: ' + downL + ', this.pos.y: ' + this.pos.y);
			if (this.pos.y > downL) {
				this.el.addClass('Player-down');
 
			}
		}

		this.checkCollisionWithBounds();

		// Update UI
		//document.getElementById("myDIV").style.transform = 'translate(20px)'; 

		// console.log(canvas);
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function () {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
