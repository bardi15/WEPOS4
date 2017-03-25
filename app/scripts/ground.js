window.Ground = (function () {
    'use strict';

    var SPEED = 2; // * 10 pixels per second

    var Ground = function (el, game) {
        this.el = el;
        this.game = game;
        this.counter = 0;

        console.log(this.el, this.game);
        // this.pos = { TOP: {T: 0, B: 0}, BOTTOM: {T: 0, B: 0}, LEFT: 0, RIGHT: 0  };
        // this.counter = game.WORLD_WIDTH;
        // this.placement = this.el.attr('class').split(' ')[1];
        // console.log(this.placement);

    };


    Ground.prototype.onFrame = function (delta) {
        this.counter -= SPEED;
        console.log('ground');
        if (this.counter < (0 - this.game.WORLD_WIDTH)) {
            this.counter = 0;
        }
        // if (this.counter <= 0) {
        // 	// console.log('true');
        // 	this.counter = this.game.WORLD_WIDTH;
        // 	HEIGHT = Math.floor((Math.random() * 15) + 10);

        // }
        // // console.log(delta.x, ', ', this.counter, SPEED);
        // if(delta.x > this.counter && delta.x < this.counter + WIGGLEFACTOR) {
        // 	return 'success';
        // }
        // this.moveObject(this.counter);

        // if (this.checkCollisionWithBounds(delta)) {
        // 	return 'failure';
        // }

        this.el.css('transform', 'translateZ(0) translate(' + this.counter + 'em, ' + 0 + 'em)');
        // this.el.css({'width': WIDTH + 'em', 'height': HEIGHT + 'em'});

    };


    Ground.prototype.checkCollisionWithBounds = function (p) {
        // var playerX = p.x;
        // var playerY = p.y;
        // var P = this.pos;

        // // console.log('Player: ' + playerX + ',' + playerY + '\n' , this.pos );

        // if ((playerX < P.RIGHT && playerX > P.LEFT)&&(
        // 	(playerY < P.BOTTOM.B && playerY > P.BOTTOM.T)||
        // 	(playerY < P.TOP.B && playerY > P.TOP.T))) {
        // 	// return this.game.gameover();
        // 	return true;
        // }
        // return false;

    };

    Ground.prototype.moveObject = function (xCor) {
        this.pos.RIGHT = xCor;
        this.pos.LEFT = xCor - WIDTH;

        this.pos.TOP.T = 0;
        this.pos.TOP.B = HEIGHT;

        this.pos.BOTTOM.T = this.game.WORLD_HEIGHT - HEIGHT;
        this.pos.BOTTOM.B = this.game.WORLD_HEIGHT;

    };

    return Ground;

})();

