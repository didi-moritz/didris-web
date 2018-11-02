var didris = (function() {

    let app = null;

    let block = null;

    let position = {
        x: 0,
        y: 0
    };

    function init() {
        initView();
        initSprites();
        initControls();
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
                block = new PIXI.Sprite(PIXI.loader.resources[constants.BLOCK_IMAGE].texture);
                app.stage.addChild(block);
            });
    }

    function updateBlock() {
        block.position.set(position.x * constants.BLOCK_SIZE, position.y * constants.BLOCK_SIZE);
    }

    function initView() {
        app = new PIXI.Application({
            width: 800,
            height: 600,
            antialias: true
        });
        
        document.body.appendChild(app.view);
    }
    
    function start() {
        console.log("Started!");

        init();
    }

    return {
        start
    };
}());