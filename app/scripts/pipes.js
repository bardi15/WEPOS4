// window.Pipes = (function () {
// 	'use strict';

// 	// var SPEED = 2; // * 10 pixels per second
// 	var WIDTH = 3.4;
// 	var HEIGHT = 10 ;
// 	
//     var min = -135; //pipes pulled up limit
//     var max = 85;
// 	var Pipes = function (el, game) {
// 		this.el = el;
// 		this.game = game;
// 		this.speed = this.game.SPEED / 2;
// 		this.pos = { TOP: { T: 0, B: 0 }, BOTTOM: { T: 0, B: 0 }, LEFT: 0, RIGHT: 0 };
// 		this.counter = game.WORLD_WIDTH;
// 		this.pipeList = [];
// 		this.difficulty = 0;
// 		this.pipesInfo = { HEIGHT_B: 28.8, HEIGHT_T: -28.8, GAP: 5 };
// 		// console.log(this.el);
//         this.storyLine = 0;
//         this.STORYLENGTH = game.STORYLENGTH;
// 		this.el.each(function (item, index) {
// 			console.log(item, index);

// 		});
// 		this.placement = 'top';

// 	};


// 	Pipes.prototype.onFrame = function (delta, place) {
// 		this.counter -= this.speed;
//         var posX = (this.storyLine % this.STORYLENGTH).toFixed(0);
//         this.storyLine += this.speed;

// 		if (this.counter <= 0) {
// 			// this.difficulty += 0.5;
// 			// console.log('true');
// 			this.setPipes();
// 			this.counter = this.game.WORLD_WIDTH;
// 			// HEIGHT = this.getRandomInt(10  + this.difficulty , (this.game.WORLD_HEIGHT / 2) - 6);
// 			// this.speed += 0.025;
// 		}
// 		// console.log(delta.x, ', ', this.counter, SPEED);
// 		if (delta.x > this.counter && delta.x < this.counter + WIGGLEFACTOR) {
// 			return 'success';
// 		}
// 		this.moveObject(this.counter);

// 		if (this.checkCollisionWithBounds(delta)) {
// 			return 'failure';
// 		}

// 		// this.el.css('transform', 'translateZ(0) translate(' + this.counter + 'em, ' + 0 + 'em)');
//         // this.el.css('transform', 'translateZ(0) translate(' + posX*-1  + 'em, ' + 0 + 'em)');

// 	};

// 	Pipes.prototype.setPipes = function () {
// 		var pipeDelta = Math.floor((Math.random() * 10) + 20);
// 		this.pipesInfo.GAP = pipeDelta;
// 		this.pipesInfo.HEIGHT_B = pipeDelta;
// 		this.pipesInfo.HEIGHT_T = pipeDelta*-1;

// 		// this.el.css({ 'top': this.pipesInfo.HEIGHT_T + 'em', 'bottom': this.pipesInfo.HEIGHT_B + 'em' });
// 		// this.el.find('.gap').css({ 'height': this.pipesInfo.GAP + 'em' });
// 		this.el.find('.pipesContainer:first').css('margin-top', 10);
//         this.el.find('.pipesContainer:eq(1)').css('margin-top', 20);
// 	    this.el.find('.pipesContainer:eq(2)').css('margin-top', 30);
// 	    this.el.find('.pipesContainer:eq(3)').css('margin-top', 40);


// 	};
//     function rnd() {
//         return parseInt(Math.random() * (max - min) + min, 10);
//     }

// 	Pipes.prototype.checkCollisionWithBounds = function (p) {
// 		var playerX = p.x;
// 		var playerY = p.y;
// 		var P = this.pos;

// 		// console.log('Player: ' + playerX + ',' + playerY + '\n' , this.pos );

// 		if ((playerX < P.RIGHT && playerX > P.LEFT) && (
// 			(playerY < P.BOTTOM.B && playerY > P.BOTTOM.T) ||
// 			(playerY < P.TOP.B && playerY > P.TOP.T))) {
// 			// return this.game.gameover();
// 			return true;
// 		}
// 		return false;

// 	};

// 	Pipes.prototype.moveObject = function (xCor) {
// 		this.pos.RIGHT = xCor;
// 		this.pos.LEFT = xCor - WIDTH;

// 		this.pos.TOP.T = 0;
// 		this.pos.TOP.B = HEIGHT;

// 		this.pos.BOTTOM.T = this.game.WORLD_HEIGHT - HEIGHT;
// 		this.pos.BOTTOM.B = this.game.WORLD_HEIGHT;

// 	};

// 	Pipes.prototype.getRandomInt = function (min, max) {
// 		return Math.random() * (max - min) + min;

// 	};
// 	return Pipes;

// })();

window.Pipes = (function () {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 0.1; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var min = 10; //pipes pulled up limit
	var max = 25;
	var WIGGLEFACTOR = 2;

	var Pipes = function (el, game) {
		this.el = el;
		this.pipeId = 0;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.po = 0;
		this.gap = 5;
		this.offset = 20;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function (pipe) {
		// this.pos.x = this.game.WORLD_WIDTH / (pipe * 5);
		this.pos.x = pipe * this.game.WORLD_WIDTH / 4;
		this.randomize();
		this.el.css('margin-top', this.gap); // 
		this.el.find('.gap').css({ 'height': this.offset + 'em' });
	};

	Pipes.prototype.randomize = function() {
		this.gap = rnd() * 10;
		this.offset = rnd();
	};

	Pipes.prototype.onFrame = function (delta, pipe) {
		this.checkCollisionWithBounds();
		// Update UI
		this.pos.x -= SPEED;
		this.pipeId = pipe;
		if (this.pos.x < (pipe * this.game.WORLD_WIDTH / 4) * -1) {
			// this.reset();
			console.log('end');
			// this.el.find('.gap').css({ 'height': rnd() + 'em' });
			// console.log('true');
			this.randomize();
			this.pos.x += this.game.WORLD_WIDTH * 2;
			this.el.css('margin-top', this.gap);
			this.el.find('.gap').css({ 'height': this.offset + 'em' });
		}
		// console.log('.pipesContainer pipe' + pipe);
		// console.log(this.el.find('.pipe' + pipe));
		// console.log(pipe);
		// this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		this.el.css('transform', 'translate(' + this.pos.x + 'em)');
		// this.el.css('background-position-y', this.bpos + 'em');
	};
	function rnd() {
		return parseInt(Math.random() * (max - min) + min, 10);
	}

	Pipes.prototype.checkCollisionWithBounds = function () {
		if (this.pos.x - WIGGLEFACTOR < this.game.player.pos.x && this.pos.x + WIGGLEFACTOR > this.game.player.pos.x) {
			// console.log(this.game.player.pos.x,this.game.player.pos.y, this.gap, this.offset, this.pos.x  );
			// console.log(this.game.player.pos.y, this.gap, this.offset);
			// console.log('## ' , this.pos.x - WIGGLEFACTOR, this.game.player.pos.x, this.pos.x + WIGGLEFACTOR);
		} else {
			// console.log(this.pos.x - WIGGLEFACTOR, this.game.player.pos.x, this.pos.x + WIGGLEFACTOR);
			
		}



		// if (this.pos.x < 0 ||
		// 	this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
		// 	this.pos.y < 0 ||
		// 	this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
		// 	return this.game.gameover();
		// }
	};

	return Pipes;

})();
