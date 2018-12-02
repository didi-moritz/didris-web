/* exported didris */
var didris = (function() {

    let stone = null;

    function start() {
        // eslint-disable-next-line no-console
        console.log("Started!");
        init();
    }

    function init() {
        initView();
        initPlayground();
        initControls();
        testStone();
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
            moveCurrentStone(1, 0);
            break;
        case constants.KEY_LEFT:
            moveCurrentStone(-1, 0);
            break;
        case constants.KEY_UP:
            moveCurrentStone(0, -1);
            break;
        case constants.KEY_DOWN:
            moveCurrentStone(0, 1);
            break;
        case 27:
            engine.stop();
            break;
        }

        updateStone();
    }

    function testStone() {
        stone = stoneFactory.createNew();
    }

    function updateStone() {
        stone.moveTo(globals.x, globals.y);
    }

    function moveCurrentStone(x, y) {
        if (stone.isMoveToPossible(globals.x + x, globals.y + y)) {
            globals.x += x;
            globals.y += y;

            stone.moveTo(globals.x, globals.y);
        }
    }

    return {
        start,
        updateStone,
        moveCurrentStone
    };
})();