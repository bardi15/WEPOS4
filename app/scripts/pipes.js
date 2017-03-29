window.Pipes = (function () {
	'use strict';

	var SPEED = 0.5; // * 10 pixels per second
	var WIDTH = 4;
	var _TOP = 14.5; //14.5
	var Pipes = function (el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.gap = 5;
		this.distance = this.game.WORLD_WIDTH / 4;
		this.margin = 0;
	};

	Pipes.prototype.reset = function (pipe) {
		this.pos.x = this.game.WORLD_WIDTH + pipe * this.distance;
		this.randomize();
		this.el.find('.gap').css({ 'height': this.gap + 'em' });
		this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' });
		this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' });

	};

	Pipes.prototype.randomize = function () {
		this.margin = rnd(8, 14);
		this.gap = rnd(12, 16);
	};

	Pipes.prototype.onFrame = function (delta, pipe) {
		if (this.game.player.gameStarted) {
			this.el.show();

			this.pos.x -= SPEED;
			if (this.pos.x < 0 - (pipe * WIDTH)) {
				this.randomize();
				this.el.find('.gap').css({ 'height': this.gap + 'em' });
				this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' });
				this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' });
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

	Pipes.prototype.checkCollisionWithBounds = function (pipe) {
		var pipeStart = this.pos.x + (pipe * WIDTH - 2) - (WIDTH - 2);
		var pipeEnd = pipeStart + (WIDTH);
		var player = this.game.player.pos.x;
		if (player > pipeEnd && player < pipeEnd + SPEED || player === pipeEnd) {
			this.game.gameScore += 1;
			if (this.game.gameScore % 2 === 0) {
				this.game.el.find('#sound_point1').get(0).play();
			} else {
				this.game.el.find('#sound_point2').get(0).play();
			}
			
		}
		if (player > pipeStart - WIDTH && player < pipeEnd - WIDTH) {
			var pipeUpperLimit = this.margin + _TOP + 2.5;  // VALUE GOES DOWN
			var pipeLowerLimit = pipeUpperLimit + this.gap - 2.5;  // VALUE GOES UP
			var playerUD = this.game.WORLD_HEIGHT - this.game.player.getBirdHeight();

			if (!(playerUD >= pipeUpperLimit && playerUD <= pipeLowerLimit)) {
				return false;
			}
		}
	};
	return Pipes;
})();
