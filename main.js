var didris = (function() {

    let block = null;

    let position = {
        x: 0,
        y: 0
    };

    function start() {
        console.log("Started!");
        init();
    }

    function init() {
        initView();
        initPlayground();
        initSprites();
        initControls();
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
                position.x++;
                break;
            case constants.KEY_LEFT:
                position.x--;
                break;
            case constants.KEY_UP:
                position.y--;
                break;
            case constants.KEY_DOWN:
                position.y++;
                break;
        }

        updateBlock();
    }

    function initSprites() {
        PIXI.loader
            .add(constants.BLOCK_IMAGE)
            .load(() => {
                let graphics = new PIXI.Graphics();
                graphics.Application
                block = new PIXI.Sprite(PIXI.loader.resources[constants.BLOCK_IMAGE].texture);
                globals.app.stage.addChild(block);
                updateBlock();
            });
    }

    function updateBlock() {
        block.position.set(position.x * constants.BLOCK_SIZE + playground.getLeft(),
            position.y * constants.BLOCK_SIZE + playground.getTop());
    }

    return {
        start
    };
})();