/* exported playground */
var playground = (function () {
    
    let left = 0;
    let top = 0;

    let blocks = null;

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

    function addBlock(x, y, block) {
        initBlocksArrayIfNecessary(x);
        blocks[x][y] = block;
    }

    function isBlockOccupied(x, y) {
        return getBlock(x, y) !== undefined;
    }

    function initBlocksArrayIfNecessary(x) {
        if (!blocks) {
            blocks = [];
        }

        if (!blocks[x]) {
            blocks[x] = [];
        }
    }

    function clearLines(lines) {
        lines.forEach(y => clearLine(y));
    }

    function clearLine(y) {
        getBlocksOfLine(y).forEach(block => block.removeAndDelete());
        while(y >= 0) {
            for (let x = 0; x < constants.PLAYGROUND_WIDTH; x++) {
                let block = getBlock(x, y - 1);
                addBlock(x, y, block);
                if (block) {
                    block.moveToAbsolute(x, y);
                }
            }
            y--;
        }
    }

    function getFullLines() {
        const lines = [];
        for (let y = 0; y < constants.PLAYGROUND_HEIGHT; y++) {
            if (getBlocksOfLine(y).length == constants.PLAYGROUND_WIDTH) {
                lines.push(y);
            }
        }

        return lines;
    }

    function getBlocksOfLine(y) {
        let result = [];
        for (let x = 0; x < constants.PLAYGROUND_WIDTH; x++) {
            let block = getBlock(x, y);
            if (block) {
                result.push(block);
            }
        }
        return result;
    }

    function getBlock(x, y) {
        if (!blocks || !blocks[x]) {
            return undefined;
        }

        return blocks[x][y];
    }

    return {
        init,
        getLeft,
        getTop,
        addBlock,
        isBlockOccupied,
        getFullLines,
        clearLines
    };
})();