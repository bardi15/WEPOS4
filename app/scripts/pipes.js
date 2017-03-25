window.Pipes = (function () {
	'use strict';

	// var SPEED = 2; // * 10 pixels per second
	var WIDTH = 3.4;
	var HEIGHT = 10 ;
	var WIGGLEFACTOR = 2;

	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.speed = this.game.SPEED / 2;
		this.pos = { TOP: { T: 0, B: 0 }, BOTTOM: { T: 0, B: 0 }, LEFT: 0, RIGHT: 0 };
		this.counter = game.WORLD_WIDTH;
		this.pipeList = [];
		this.difficulty = 0;
		// console.log(this.el);
		this.el.each(function (item, index) {
			console.log(item, index);

		});
		this.placement = 'top';

	};


	Pipes.prototype.onFrame = function (delta, place) {
		this.counter -= this.speed;
		if (this.counter <= 0) {
			this.difficulty += 0.5;
			// console.log('true');
			this.counter = this.game.WORLD_WIDTH;
			HEIGHT = this.getRandomInt(10  + this.difficulty , (this.game.WORLD_HEIGHT / 2) - 6);
			// this.speed += 0.025;
		}
		// console.log(delta.x, ', ', this.counter, SPEED);
		if (delta.x > this.counter && delta.x < this.counter + WIGGLEFACTOR) {
			return 'success';
		}
		this.moveObject(this.counter);

		if (this.checkCollisionWithBounds(delta)) {
			return 'failure';
		}

		this.el.css('transform', 'translateZ(0) translate(' + this.counter + 'em, ' + 0 + 'em)');
		this.el.css({ 'width': WIDTH + 'em', 'height': HEIGHT + 'em' });

	};


	Pipes.prototype.checkCollisionWithBounds = function (p) {
		var playerX = p.x;
		var playerY = p.y;
		var P = this.pos;

		// console.log('Player: ' + playerX + ',' + playerY + '\n' , this.pos );

		if ((playerX < P.RIGHT && playerX > P.LEFT) && (
			(playerY < P.BOTTOM.B && playerY > P.BOTTOM.T) ||
			(playerY < P.TOP.B && playerY > P.TOP.T))) {
			// return this.game.gameover();
			return true;
		}
		return false;

	};

	Pipes.prototype.moveObject = function (xCor) {
		this.pos.RIGHT = xCor;
		this.pos.LEFT = xCor - WIDTH;

		this.pos.TOP.T = 0;
		this.pos.TOP.B = HEIGHT;

		this.pos.BOTTOM.T = this.game.WORLD_HEIGHT - HEIGHT;
		this.pos.BOTTOM.B = this.game.WORLD_HEIGHT;

	};

	Pipes.prototype.getRandomInt = function (min, max) {
		return Math.random() * (max - min) + min;

	};
	return Pipes;

})();

