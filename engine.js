/* exported engine */
var engine = (function () {

    let running = false;
    let speedInMs = 1000;
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

    return {
        run,
        start,
        stop
    };
})();