/* exported blockFactory */
var blockFactory = (function () {
    const BORDER_WIDTH = 2;
    const BORDER_COLOR = 0x000000;
    
    function createNew(startX, startY, color, isGhost = false) {
        let graphics = new PIXI.Graphics(); 

        initGraphics(isGhost);

        let x = startX;
        let y = startY;

        function getCoords() {
            return {x, y};
        }

        function moveTo(offsetX, offsetY) {
            graphics.position.set(calculateLeft(offsetX), calculateTop(offsetY));
        }

        function moveToAbsolute(newX, newY) {
            x = newX;
            y = newY;
            moveTo(0, 0);
        }

        function initGraphics(isGhost) {
            graphics.lineStyle(BORDER_WIDTH, BORDER_COLOR, 1);
            graphics.beginFill(color);
            graphics.drawRect(0, 0, constants.BLOCK_SIZE, constants.BLOCK_SIZE);

            graphics.parentGroup = isGhost ? globals.ghostBlocksDisplayGroup : globals.blocksDisplayGroup;
            globals.app.stage.addChild(graphics);
        }
        
        function removeAndDelete() {
            globals.app.stage.removeChild(graphics);
            graphics.destroy();
            graphics = undefined;
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

            if (offsetY + y >= constants.PLAYGROUND_HEIGHT) {
                return false;
            }

            if (playground.isBlockOccupied(offsetX + x, offsetY + y)) {
                return false;
            }

            return true;
        }

        function updateBlocksOfPlayground(offsetX, offsetY) {
            playground.addBlock(offsetX + x, offsetY + y, this);
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
            removeAndDelete,
            moveTo,
            moveToAbsolute,
            isMoveToPossible,
            isRotateClockwisePossible,
            isRotateCounterClockwisePossible,
            rotateClockwise,
            rotateCounterClockwise,
            updateBlocksOfPlayground
        };
    }

    return {
        createNew
    };
})();