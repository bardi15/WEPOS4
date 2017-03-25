window.Pipes = (function () {
	'use strict';

	var SPEED = 2; // * 10 pixels per second
	var WIDTH = 3.4;
	var HEIGHT = 15;
	var WIGGLEFACTOR = 2;
	// var INITIAL_POSITION_X = 30;
	// var INITIAL_POSITION_Y = 25;

	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		// this.pos = { x: game.WORLD_WIDTH, y: 0 };
				// this.pos = { x: game.WORLD_WIDTH, y: 0 };
		// this.pos = { TOP: HEIGHT, BOTTOM: 0, LEFT: game.WORLD_WIDTH - WIDTH, RIGHT: game.WORLD_WIDTH  };
		this.pos = { TOP: {T: 0, B: 0}, BOTTOM: {T: 0, B: 0}, LEFT: 0, RIGHT: 0  };
		this.counter = game.WORLD_WIDTH;
		this.placement = this.el.attr('class').split(' ')[1];
		console.log(this.placement);
	// 		width: 3.4em;
	// height: 15em;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	// Pipes.prototype.reset = function() {
	// 	this.pos.x = INITIAL_POSITION_X;
	// 	this.pos.y = INITIAL_POSITION_Y;
	// };

	Pipes.prototype.onFrame = function (delta, place) {
		// if (Controls.keys.right) {
		// 	this.pos.x += delta * SPEED;
		// }
		// if (Controls.keys.left) {
		// 	this.pos.x -= delta * SPEED;
		// }
		// if (Controls.keys.down) {
		// 	this.pos.y += delta * SPEED;
		// }
		// if (Controls.keys.space) {
		// 	this.pos.y -= delta * SPEED;
		// } else {
		// 	this.pos.y += delta * 50;
		// }
		// console.log(delta);
		this.counter -= SPEED;
		if (this.counter <= 0) {
			this.counter = this.game.WORLD_WIDTH;
			HEIGHT = Math.floor((Math.random() * 15) + 10);
		}
		this.moveObject(this.counter);
		// if (this.placement === 'top') {
		// 	this.el.addClass('Pipes-up');
		// 	t
		// } else if (this.placement === 'bottom') {
		// 	this.el.addClass('Pipes-down');
		// 	this.moveObject(this.counter, 'bottom');
		// }

		this.checkCollisionWithBounds(delta);

		// Update UI
		//document.getElementById("myDIV").style.transform = 'translate(20px)'; 

		this.el.css('transform', 'translateZ(0) translate(' + this.counter + 'em, ' + 0 + 'em)');
		this.el.css({'width': WIDTH + 'em', 'height': HEIGHT + 'em'});
		// this.el.addClass('Pipes-up');
		// console.log(place);

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

		// if ((this.pos.x - 2 < p.x && this.pos.x + 2 > p.x)&&
		// 	(p.y > 45)) {
		// 	return this.game.gameover();
		// }
		// console.log(this.pos);

	};

	Pipes.prototype.moveObject = function(xCor) {
		this.pos.RIGHT = xCor;
		this.pos.LEFT = xCor - WIDTH;

		// this.pos.TOP.T = this.game.WORLD_HEIGHT - HEIGHT;
		// this.pos.TOP.B = 0;

		// this.pos.BOTTOM.T = HEIGHT;
		// this.pos.BOTTOM.B = this.game.WORLD_HEIGHT;

		this.pos.TOP.T = 0;
		this.pos.TOP.B = HEIGHT;
		
		this.pos.BOTTOM.T = this.game.WORLD_HEIGHT - HEIGHT;
		this.pos.BOTTOM.B = this.game.WORLD_HEIGHT;

	};

	return Pipes;

})();

