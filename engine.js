/* exported engine */
var engine = (function () {

    let running = false;
    let speedInMs = 1000;
    let runningFallDown = false;
    let fallDownSpeedInMs = 10;
    let currentTimeout = null;
    
    function start() {
        running = true;
        run();
    }

    function stop() {
        running = false;
        clearTimeout(currentTimeout);
    }

    function run() {
        if (!running) {
            return;
        }

        if (!didris.isCurrentStoneAvailabe()) {
            didris.haveNewStone();
        }

        didris.moveCurrentStoneOneStepDownOrCreateNewStone();

        next();
    }

    function next() {
        currentTimeout = setTimeout(run, speedInMs);
    }
    
    function fallDown() {
        stop();
        runningFallDown = true;
        runFallDown();
    }

    function stopFallDown() {
        if (!runningFallDown) {
            return;
        }

        runningFallDown = false;
        clearTimeout(currentTimeout);
        start();
    }

    function runFallDown() {
        if (!runningFallDown) {
            return;
        }

        didris.moveCurrentStoneOneStepDown();
        didris.increaseStoneDrop();

        if (didris.isCurrentStoneAlreadyAtBottom()) {
            stopFallDown();
        } else {
            nextFallDown();
        }
    }

    function nextFallDown() {
        currentTimeout = setTimeout(runFallDown, fallDownSpeedInMs);
    }

    return {
        run,
        start,
        stop,
        fallDown
    };
})();