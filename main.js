/* exported didris */
var didris = (function() {

    let stone = null;

    function start() {
        // eslint-disable-next-line no-console
        console.log("Started!");
        init();
    }

    function isCurrentStoneAvailabe() {
        return stone != null;
    }

    function init() {
        initView();
        initPlayground();
        initControls();
        engine.start();
    }

    function initView() {
        globals.app = new PIXI.Application({
            width: constants.VIEW_WIDTH,
            height: constants.VIEW_HEIGHT,
            antialias: true
        });
        
        document.body.appendChild(globals.app.view);
    }

    function initPlayground() {
        playground.init();
    }

    function initControls() {
        document.addEventListener("keydown", onKeyPress);
    }

    function onKeyPress(event) {
        switch (event.keyCode) {
        case constants.KEY_RIGHT:
            moveCurrentStoneIfPossible(1, 0);
            break;
        case constants.KEY_LEFT:
            moveCurrentStoneIfPossible(-1, 0);
            break;
        case constants.KEY_UP:
            moveCurrentStoneIfPossible(0, -1);
            break;
        case constants.KEY_DOWN:
            moveCurrentStoneOneStepDownOrCreateNewStone();
            break;
        case 27:
            audio.stopBackgroundBeat();
            engine.stop();
            break;
        }

        updateStone();
    }

    function haveNewStone() {
        stone = stoneFactory.createNew();
        globals.x = 0;
        globals.y = 0;
        updateStone();
    }

    function updateStone() {
        stone.moveTo(globals.x, globals.y);
    }

    function moveCurrentStoneIfPossible(x, y) {
        if (isCurrentStoneMoveable(x, y)) {
            moveCurrentStone(x, y);
        }

        return false;
    }

    function isCurrentStoneMoveable(x, y) {
        return stone.isMoveToPossible(globals.x + x, globals.y + y);
    }

    function moveCurrentStone(x, y) {
        globals.x += x;
        globals.y += y;

        stone.moveTo(globals.x, globals.y);
    }

    function isCurrentStoneAlreadyAtBottom() {
        return !isCurrentStoneMoveable(0, 1);
    }

    function moveCurrentStoneOneStepDownOrCreateNewStone() {
        if (isCurrentStoneAlreadyAtBottom()) {
            haveNewStone();
        } else {
            moveCurrentStoneIfPossible(0, 1);
        }
    }

    return {
        start,
        isCurrentStoneAvailabe,
        haveNewStone,
        updateStone,
        moveCurrentStoneOneStepDownOrCreateNewStone,
        moveCurrentStoneIfPossible,
        isCurrentStoneAlreadyAtBottom
    };
})();