window.Pipes = (function () {
	'use strict';

	var SPEED = 0.5; // * 10 pixels per second
	var WIDTH = 4;
	var INFRONT = false;
	var _TOP = 14.5; //14.5
	var CC = 0;
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
		this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' })

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
				this.el.find('.pipe').css({ 'margin-top': this.margin + 'em' })
				this.el.find('.pipe').css({ 'margin-bottom': this.margin * -1 + 'em' })
				this.pos.x += this.game.WORLD_WIDTH * 1.5;
			}

			this.el.css('transform', 'translate(' + this.pos.x + 'em)');
			if (this.checkCollisionWithBounds(pipe) === false) {
				return 'failure';
			}
		}
	};
	function rnd(max, min) {
		return parseInt(Math.random() * (max - min) + min, 10);
	}

	Pipes.prototype.checkCollisionWithBounds = function (pipe) {
		this.el.css({ 'background-color': 'white' });
		var pipeStart = this.pos.x + (pipe * WIDTH - 2) - (WIDTH - 2);
		var nextPipe = pipeStart + this.distance + WIDTH;
		var pipeEnd = pipeStart + (WIDTH);
		var player = this.game.player.pos.x;
		// console.log(pipeStart, player, pipeEnd, pipe);


		// this.el.css({'background-color':'green'});
		if (player > pipeEnd && player < pipeEnd + SPEED || player === pipeEnd) {
			this.game.gameScore += 1;
			this.game.el.find('#sound_point').get(0).play();
		}
		// if (CC === 10) {
		// 	console.log(CC);
		// } else if (CC === 20) {
		// 	CC = 0;
		// }


		// console.log(pipe, ':', pipeStart.toFixed(2), pipeEnd.toFixed(2), player.toFixed(2), nextPipe.toFixed(2));
		// if (INFRONT) {
		// 	this.game.gameScore += 1;
		// 	this.game.el.find('#sound_point').get(0).play();
		// }
		if (player > pipeStart - WIDTH && player < pipeEnd - WIDTH) {
			// this.el.css({ 'background-color': 'green' });
			var pipeUpperLimit = this.margin + _TOP + 2.5;  // VALUE GOES DOWN
			var pipeLowerLimit = pipeUpperLimit + this.gap - 2.5;  // VALUE GOES UP
			var playerUD = this.game.WORLD_HEIGHT - this.game.player.getBirdHeight();

			var t;
			var vwidth = 1000;
			var ps = pipeStart * 10;
			var heights = 2;
			var xnxx = pipeLowerLimit;
			if (pipe === 1) {
				t = this.game.el.find('.talky1');
				t.css({ 'width': vwidth });
				t.css({ 'height': heights });
				t.css({ 'margin-left': ps });
				t.css({ 'margin-top': xnxx });
			} else if (pipe === 2) {
				t = this.game.el.find('.talky2');
				t.css({ 'width': vwidth });
				t.css({ 'height': heights });
				t.css({ 'margin-left': ps });
				t.css({ 'margin-top': xnxx });
			} else if (pipe === 3) {
				t = this.game.el.find('.talky3');
				t.css({ 'width': vwidth });
				t.css({ 'height': heights });
				t.css({ 'margin-left': ps });
				t.css({ 'margin-top': xnxx });
			} else if (pipe === 4) {
				t = this.game.el.find('.talky4');
				t.css({ 'width': vwidth });
				t.css({ 'height': heights });
				t.css({ 'margin-left': ps });
				t.css({ 'margin-top': xnxx });
			}

			if (!(playerUD >= pipeUpperLimit && playerUD <= pipeLowerLimit)) {
				return false;
			}
		}
	};
	return Pipes;
})();
