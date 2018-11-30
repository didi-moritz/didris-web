/* exported playground */
var playground = (function () {
    
    let left = 0;
    let top = 0;

    function init() {
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(constants.PLAYGROUND_BORDER_WIDTH, constants.PLAYGROUND_BORDER_COLOR, 1);
        left = (constants.VIEW_WIDTH - getWidth()) / 2;
        top = (constants.VIEW_HEIGHT - getHeight()) / 2;
        graphics.drawRect(left - constants.PLAYGROUND_BORDER_WIDTH, top - constants.PLAYGROUND_BORDER_WIDTH,
            getWidth() + 2 * constants.PLAYGROUND_BORDER_WIDTH, getHeight() + 2 * constants.PLAYGROUND_BORDER_WIDTH);

        globals.app.stage.addChild(graphics);
    }

    function getWidth() {
        return constants.BLOCK_SIZE * constants.PLAYGROUND_WIDTH;
    }

    function getHeight() {
        return constants.BLOCK_SIZE * constants.PLAYGROUND_HEIGHT;
    }

    function getLeft() {
        return left;
    }

    function getTop() {
        return top;
    }
 
    return {
        init,
        getLeft,
        getTop,
    };
})();