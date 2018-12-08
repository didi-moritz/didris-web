/* exported playground */
var playground = (function () {
    
    let left = 0;
    let top = 0;

    let blockStatus = null;

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

    function setBlockOccupied(x, y) {
        initBlockStatuusIfNecessary(x);
        blockStatus[x][y] = 1;
    }

    function isBlockOccupied(x, y) {
        initBlockStatuusIfNecessary(x);
        return blockStatus[x][y] === 1;
    }

    function initBlockStatuusIfNecessary(x) {
        if (blockStatus == null) {
            blockStatus = [];
        }

        if (blockStatus[x] == null) {
            blockStatus[x] = [];
        }
    }
 
    return {
        init,
        getLeft,
        getTop,
        setBlockOccupied,
        isBlockOccupied
    };
})();