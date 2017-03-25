window.Pipes = (function () {
	'use strict';

	var SPEED = 2; // * 10 pixels per second
	var WIDTH = 3.4;
	var HEIGHT = 15;
	// var WIGGLEFACTOR = 2;

	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { TOP: {T: 0, B: 0}, BOTTOM: {T: 0, B: 0}, LEFT: 0, RIGHT: 0  };
		this.counter = game.WORLD_WIDTH;
		this.placement = this.el.attr('class').split(' ')[1];
		console.log(this.placement);

	};


	Pipes.prototype.onFrame = function (delta, place) {

		this.counter -= SPEED;
		if (this.counter <= 0) {
			this.counter = this.game.WORLD_WIDTH;
			HEIGHT = Math.floor((Math.random() * 15) + 10);
		}
		this.moveObject(this.counter);

		this.checkCollisionWithBounds(delta);

		this.el.css('transform', 'translateZ(0) translate(' + this.counter + 'em, ' + 0 + 'em)');
		this.el.css({'width': WIDTH + 'em', 'height': HEIGHT + 'em'});


	};


	Pipes.prototype.checkCollisionWithBounds = function(p) {
		var playerX = p.x;
		var playerY = p.y;
		var P = this.pos;

		console.log('Player: ' + playerX + ',' + playerY + '\n' , this.pos );

		if ((playerX < P.RIGHT && playerX > P.LEFT)&&(
			(playerY < P.BOTTOM.B && playerY > P.BOTTOM.T)||
			(playerY < P.TOP.B && playerY > P.TOP.T))) {
			return this.game.gameover();
		}

	};

	Pipes.prototype.moveObject = function(xCor) {
		this.pos.RIGHT = xCor;
		this.pos.LEFT = xCor - WIDTH;

		this.pos.TOP.T = 0;
		this.pos.TOP.B = HEIGHT;
		
		this.pos.BOTTOM.T = this.game.WORLD_HEIGHT - HEIGHT;
		this.pos.BOTTOM.B = this.game.WORLD_HEIGHT;

	};

	return Pipes;

})();

