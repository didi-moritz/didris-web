/* exported blockFactory */
var blockFactory = (function () {
    const BORDER_WIDTH = 2;
    const BORDER_COLOR = 0x668833;
    
    function createNew(x, y, color) {
        const graphics = new PIXI.Graphics(); 

        initGraphics();

        function getCoords() {
            return {x, y};
        }

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

        function isMoveToPossible(offsetX, offsetY) {
            if (offsetX + x < 0) {
                return false;
            }

            if (offsetX + x >= constants.PLAYGROUND_WIDTH) {
                return false;
            }

            if (offsetY + y < 0) {
                return false;
            }

            if (offsetY + y >= constants.PLAYGROUND_HEIGHT) {
                return false;
            }

            return true;
        }

        function rotateClockwise(pivotCoords) {
            let newCoords = getRotateClockwisePosition(pivotCoords);

            x = newCoords.x;
            y = newCoords.y;
        }

        function rotateCounterClockwise(pivotCoords) {
            let newCoords = getRotateCounterClockwisePosition(pivotCoords);

            x = newCoords.x;
            y = newCoords.y;
        }

        function isRotateClockwisePossible(offsetX, offsetY, pivotCoords) {
            let newCoords = getRotateClockwisePosition(pivotCoords);
            return isMoveToNewRotatedCoordsPossible(offsetX, offsetY, newCoords);
        }

        function isRotateCounterClockwisePossible(offsetX, offsetY, pivotCoords) {
            let newCoords = getRotateCounterClockwisePosition(pivotCoords);
            return isMoveToNewRotatedCoordsPossible(offsetX, offsetY, newCoords);
        }

        function isMoveToNewRotatedCoordsPossible(offsetX, offsetY, newCoords) {
            return isMoveToPossible(offsetX + newCoords.x - x, offsetY + newCoords.y - y);
        }

        function getRotateClockwisePosition(pivotCoords) {
            return {
                x: pivotCoords.x - (y - pivotCoords.y),
                y: pivotCoords.y + (x - pivotCoords.x)
            };
        }

        function getRotateCounterClockwisePosition(pivotCoords) {
            return {
                x: pivotCoords.x + (y - pivotCoords.y),
                y: pivotCoords.y - (x - pivotCoords.x)
            };
        }

        return {
            getCoords,
            moveTo,
            isMoveToPossible,
            isRotateClockwisePossible,
            isRotateCounterClockwisePossible,
            rotateClockwise,
            rotateCounterClockwise
        };
    }

    return {
        createNew
    };
})();