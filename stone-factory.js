/* exported stoneFactory */
var stoneFactory = (function () {
    function createNew(type) {
        let color;
        let blocks = [];
        let pivotBlock = null;
        let flip = true;
        let initalFlipDirection = true;
        let pivotClockwise = true;

        (function init() {
            let stoneType = stoneTypes.getRandomType();

            color = stoneType.color;
            stoneType.blocks.forEach(convertTypeBlock);

            if (stoneType.pivotBlockNumber !== null) {
                pivotBlock = blocks[stoneType.pivotBlockNumber];
                flip = stoneType.flip;
                pivotClockwise = stoneType.pivotDirection === "CW";
            }
        })();

        function convertTypeBlock(block) {
            blocks.push(blockFactory.createNew(block.x, block.y, color));
        }

        function moveTo(offsetX, offsetY) {
            blocks.forEach(block => block.moveTo(offsetX, offsetY));
        }

        function isMoveToPossible(x, y) {
            return blocks.every(block => block.isMoveToPossible(x, y));
        }

        function isRotationOrFlipPossible(x, y) {
            if (pivotBlock == null) {
                return false;
            }

            if (isNextRotationClockwise()) {
                return isRotateClockwisePossible(x, y);
            } else {
                return isRotateCounterClockwisePossible(x, y);
            }
        }

        function rotateOrFlip() {
            if (isNextRotationClockwise()) {
                rotateClockwise();
            } else {
                rotateCounterClockwise();
            }

            if (flip) {
                initalFlipDirection = !initalFlipDirection;
            }
        }

        function isNextRotationClockwise() {
            if (flip) {
                return ((initalFlipDirection && pivotClockwise) ||
                    (!initalFlipDirection && !pivotClockwise));
            } else {
                return pivotClockwise;
            }
        }

        function rotateClockwise() {
            blocks.forEach(block => {
                block.rotateClockwise(pivotBlock.getCoords());
            });
        }

        function rotateCounterClockwise() {
            blocks.forEach(block => {
                block.rotateCounterClockwise(pivotBlock.getCoords());
            });
        }

        function isRotateClockwisePossible(x, y) {
            return blocks.every(block => 
                block.isRotateClockwisePossible(x, y, pivotBlock.getCoords()));
        }

        function isRotateCounterClockwisePossible(x, y) {
            return blocks.every(block =>
                block.isRotateCounterClockwisePossible(x, y, pivotBlock.getCoords()));
        }

        function updateBlockStatuusOfPlayground(x, y) {
            blocks.forEach(block => block.updateBlockStatuusOfPlayground(x, y));
        }

        return {
            isMoveToPossible,
            moveTo,
            isRotationOrFlipPossible,
            rotateOrFlip,
            updateBlockStatuusOfPlayground
        };
    }

    return {
        createNew
    };
})();