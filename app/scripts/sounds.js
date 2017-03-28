'use strict';

function loop() {
    var myAudio = new Audio('../sounds/sfx_loop.ogg');
    if (typeof myAudio.loop === 'boolean')
    {
        myAudio.loop = true;
    }
    else
    {
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    myAudio.play();
}

loop();