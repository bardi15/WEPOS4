window.Pipes = (function () {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 0.5  ; // * 10 pixels per second
	var WIDTH = 4;
	// var HEIGHT = 5;
	// var INITIAL_POSITION_X = 30;
	// var INITIAL_POSITION_Y = 25;
	// var min = 10; //pipes pulled up limit
	// var max = 25;
	var WIGGLEFACTOR = 1;
	var _TOP = 14.5;
	// var _BOTTOM = 21;

	var Pipes = function (el, game) {
		this.el = el;
		// this.pipeId = 0;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		// this.po = 0;
		this.gap = 5;
		// this.offset = 20;
		this.distance = 12.4;
		this.margin = 0;
		// this.success = false;
		// this.checked = false;
	};

	Pipes.prototype.reset = function (pipe) {
		this.pos.x = 100 + pipe * this.distance;
		this.randomize();
		this.el.find('.gap').css({ 'height': this.gap + 'em' });
		this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' });
		this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' })

	};

	Pipes.prototype.randomize = function () {
		this.margin = rnd(10,18);
		this.gap = rnd(4,10);
	};

	Pipes.prototype.onFrame = function (delta, pipe) {

		if (this.checkCollisionWithBounds(pipe) === false) {
			return 'failure';
		}
		this.pos.x -= SPEED;
		// this.pipeId = pipe;
		if (this.pos.x <= this.distance * -1 - (pipe * WIDTH)) {
			this.randomize();
			this.el.find('.gap').css({ 'height': this.gap + 'em' });
			this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' })
			this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' })
			this.pos.x += 75;
		}

		this.el.css('transform', 'translate(' + this.pos.x + (pipe * WIDTH) + 'em)');
	};
	function rnd(max,min) {
		return parseInt(Math.random() * (max - min) + min, 10);
	}

	Pipes.prototype.checkCollisionWithBounds = function (pipe) {
		var pipeStart = (this.pos.x - WIDTH);
		var pipeEnd = (this.pos.x);

		var player = this.game.player.pos.x - pipe * (WIDTH - 1);

		if (player > pipeEnd && player < pipeEnd + SPEED) {
			this.game.gameScore += 1;
			this.game.playSound('sfx_point.ogg');
		}

		if (player > pipeStart && player < pipeEnd) {
			var pipeUpperLimit = this.margin + _TOP;
			var pipeLowerLimit = pipeUpperLimit + this.gap - 2.4;
			var playerUD = this.game.player.pos.y;

			// this.game.player.pos.y = pipeLowerLimit + 0.2;

			// this.checked = false;
			if (playerUD > pipeUpperLimit && playerUD < pipeLowerLimit) {
 

			} else {
				return false;
			}
			// this.success = false;
		}

	};

	return Pipes;

})();
