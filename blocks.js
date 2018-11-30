/* exported blocks */
var blocks = (function () {
    const BORDER_WIDTH = 2;
    const BORDER_COLOR = 0x668833;
    const FILL_COLOR = 0x333388;
    
    function createNew() {
        const graphics = new PIXI.Graphics(); 

        let x = 0;
        let y = 0;

        function setPositionAndRedraw(newX, newY) {
            setPosition(newX, newY);
            redraw();
        }

        function setPosition(newX, newY) {
            x = newX;
            y = newY;
        }

        function initGraphics() {
            graphics.lineStyle(BORDER_WIDTH, BORDER_COLOR, 1);
            graphics.beginFill(FILL_COLOR);
            graphics.drawRect(0, 0, constants.BLOCK_SIZE, constants.BLOCK_SIZE);

            globals.app.stage.addChild(graphics);
        }

        function redraw() {
            graphics.position.set(calculateLeft(), calculateTop());
        }

        function calculateLeft() {
            return playground.getLeft() + x * constants.BLOCK_SIZE;
        }

        function calculateTop() {
            return playground.getTop() + y * constants.BLOCK_SIZE;
        }

        initGraphics();

        return {
            setPosition,
            redraw,
            setPositionAndRedraw
        };
    }

    return {
        createNew
    };
})();