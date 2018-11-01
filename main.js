var didris = (function() {

    let app = null;

    let block = null;

    function init() {
        initView();
        initSprites();
    }

    function initSprites() {
        PIXI.loader
            .add(constants.BLOCK_IMAGE)
            .load(() => {
                block = new PIXI.Sprite(PIXI.loader.resources[constants.BLOCK_IMAGE].texture);

                app.stage.addChild(block);
            });
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