/* exported blockFactory */
var blockFactory = (function () {
    const BORDER_WIDTH = 2;
    const BORDER_COLOR = 0x668833;
    
    function createNew(x, y, color) {
        const graphics = new PIXI.Graphics(); 

        initGraphics();

        function moveTo(offsetX, offsetY) {
            graphics.position.set(calculateLeft(offsetX), calculateTop(offsetY));
        }

        function initGraphics() {
            graphics.lineStyle(BORDER_WIDTH, BORDER_COLOR, 1);
            graphics.beginFill(color);
            graphics.drawRect(0, 0, constants.BLOCK_SIZE, constants.BLOCK_SIZE);

            globals.app.stage.addChild(graphics);
        }

        function calculateLeft(offsetX) {
            return playground.getLeft() + (x + offsetX) * constants.BLOCK_SIZE;
        }

        function calculateTop(offsetY) {
            return playground.getTop() + (y + offsetY) * constants.BLOCK_SIZE;
        }

        return {
            moveTo
        };
    }

    return {
        createNew
    };
})();