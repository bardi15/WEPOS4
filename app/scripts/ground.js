window.Ground = (function () {
    'use strict';

    // var SPEED = 1 ; // * 10 pixels per second
    var STORYLENGTH = 33.6;

    var Ground = function (el, game) {
        this.el = el;
        this.game = game;
        this.counter = 0;
        this.pipeC = 0;
        this.storyLine = 0;
        this.speed = this.game.SPEED / 5;
            // this.el.append("<div class='Pipes Pipes-down' style='left: " + this.pipeC * 3.36 * 8  + "%'></div>");
            // this.el.append("<div class='Pipes Pipes-up ' style='left: " + this.pipeC * 3.36 * 8  + "%'></div>");
            // var pipe  = new window.Pipes(this.el.find('.Pipes'), this);
        console.log(this.el, this.game);
        // this.pos = { TOP: {T: 0, B: 0}, BOTTOM: {T: 0, B: 0}, LEFT: 0, RIGHT: 0  };
        // this.counter = game.WORLD_WIDTH;
        // this.placement = this.el.attr('class').split(' ')[1];
        // console.log(this.placement);

    };


    Ground.prototype.onFrame = function (delta) {
        this.counter -= this.speed;
        this.storyLine += this.speed;
        var pos = (this.storyLine % STORYLENGTH).toFixed(0);
        // console.log('ground');
        // if (this.counter < (0 - 33.6)) {
        //     this.counter = 0;
        //     // for (var i = 0; i < 10; i++) {
        //     //     // this.el.remove(".Ground");
        //     //     this.el.children(".Pipes:last").remove();
        //     //     this.pipeC -= 1;
        //     // }
        //     this.createPipe();
        // }
        // console.log('pos: ' , pos);
        if (pos == 0) {
            // for (var i = 0; i < 10; i++) {
            //     // this.el.remove(".Ground");
            //     this.el.children(".Pipes:last").remove();
            //     this.pipeC -= 1;
            // }
            // this.createPipe(pos);
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
        //for (; this.pipeC < 10; this.pipeC++) {
            

        //}
        this.el.css('transform', 'translateZ(0) translate(' + pos*-1  + 'em, ' + 0 + 'em)');
        // this.el.css({'width': WIDTH + 'em', 'height': HEIGHT + 'em'});

    };


    Ground.prototype.createPipe = function (pos) {
        
            var z = Math.floor((Math.random() * 15) + 10);
            console.log(pos+z);  
            this.el.append("<div class='Pipes Pipes-down' style='left: " +  pos+z  + "%' id=" + this.pipeC + "></div>");
            this.pipeC += 1;
            // this.el.append("<div class='Pipes Pipes-up ' style='left: " + this.pipeC * 3.36 * 8  + "%'></div>");
            var pipe  = new window.Pipes(this.el.find('.Pipes'), this);
            
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

