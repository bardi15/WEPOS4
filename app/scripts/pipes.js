window.Pipes = (function () {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 0.5; // * 10 pixels per second
	var WIDTH = 4;
	// var HEIGHT = 5;
	// var INITIAL_POSITION_X = 30;
	// var INITIAL_POSITION_Y = 25;
	// var min = 10; //pipes pulled up limit
	// var max = 25;
	var WIGGLEFACTOR = 1;
	var _TOP = 14.5; //14.5
	// var _BOTTOM = 21;

	var Pipes = function (el, game) {
		this.el = el;
		// this.pipeId = 0;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		// this.po = 0;
		this.gap = 5;
		// this.offset = 20;
		this.distance = this.game.WORLD_WIDTH / 4;
		this.margin = 0;
		// this.success = false;
		// this.checked = false;
	};

	Pipes.prototype.reset = function (pipe) {
		this.pos.x = this.game.WORLD_WIDTH + pipe * this.distance;
		this.randomize();
		this.el.find('.gap').css({ 'height': this.gap + 'em' });
		this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' });
		this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' })

	};

	Pipes.prototype.randomize = function () {
		this.margin = rnd(10, 18);
		this.gap = rnd(12, 16);
		// this.margin = 12;
		// this.gap = 14;
	};

	Pipes.prototype.onFrame = function (delta, pipe) {
		// console.log(this.game.player.getBirdHeight());
		if (this.game.player.gameStarted) {
			this.el.show();

			this.pos.x -= SPEED;
			// this.pipeId = pipe;
			// if (this.pos.x <= (this.game.WORLD_WIDTH + pipe * this.distance)*-1) {
			if (this.pos.x < 0 - (pipe*WIDTH)) {
				this.randomize();
				this.el.find('.gap').css({ 'height': this.gap + 'em' });
				this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' })
				this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' })
				// this.pos.x = this.game.WORLD_WIDTH + pipe * this.distance;
				this.pos.x += this.game.WORLD_WIDTH * 1.5;
			}

			this.el.css('transform', 'translate(' + this.pos.x + 'em)');
			if (this.checkCollisionWithBounds(pipe) === false) {
				return 'failure';
			}
		} else {
			this.el.hide();
		}

	};
	function rnd(max, min) {
		return parseInt(Math.random() * (max - min) + min, 10);
	}
	function matrixToArray(str) {
		return str.match(/\d+/g);
	}

	Pipes.prototype.checkCollisionWithBounds = function (pipe) {
		// var cP = this.el.css('transform');
		// console.log(matrixToArray(cP)[4]);

		// console.log(this.el.css('transform')[4]);
		this.el.css({ 'background-color': 'orange' });
		// var pipeStart = (this.pos.x - WIDTH);
		// var pipeEnd = (this.pos.x);

		var pipeStart = this.pos.x + (pipe * WIDTH-1);
		var pipeEnd = pipeStart + 2;

		// var player = this.game.player.pos.x 
		var player = this.game.player.pos.x;

		if (player > pipeEnd && player < pipeEnd + SPEED) {
			this.game.gameScore += 1;
			this.game.playSound('sfx_point.ogg');

		}

		if (player > pipeStart && player < pipeEnd) {
			// console.log('line');
			// this.el.css({ 'background-color': 'red' });
			var pipeUpperLimit = this.margin + _TOP + 2.5;  // VALUE GOES DOWN
			var pipeLowerLimit = pipeUpperLimit + this.gap - 2.5;  // VALUE GOES UP
			var playerUD = this.game.WORLD_HEIGHT - this.game.player.getBirdHeight();
			console.log(pipeUpperLimit, playerUD, pipeLowerLimit);
			// this.game.player.pos.y = pipeUpperLimit;
			
			// this.checked = false;
			if (playerUD >= pipeUpperLimit && playerUD <= pipeLowerLimit) {
				// console.log('no');
				this.el.css({'background-color':'green'});

			} else {
				// console.log(pipeUpperLimit, playerUD, pipeLowerLimit);
				this.el.css({'background-color':'red'});
				// console.log('hit pipe');
				console.log(pipeUpperLimit, playerUD, pipeLowerLimit);
				return false;
			}
			// this.success = false;
		}

	};

	return Pipes;

})();
