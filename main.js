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
            globals.x++;
            break;
        case constants.KEY_LEFT:
            globals.x--;
            break;
        case constants.KEY_UP:
            globals.y--;
            break;
        case constants.KEY_DOWN:
            globals.y++;
            break;
        case 27:
            engine.stop();
            break;
        }

        updateStone();
    }

    function testStone() {
        stone = stoneFactory.createNew(1);
    }

    function updateStone() {
        stone.moveTo(globals.x, globals.y);
    }

    return {
        start,
        updateStone
    };
})();