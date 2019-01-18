/* exported stoneFactory */
var stoneFactory = (function () {
    function createNew(type, isNextStone = false) {
        let color;
        let blocks = [];
        let pivotBlock = null;
        let flip = true;
        let initalFlipDirection = true;
        let pivotClockwise = true;
        let ghostBlocks = [];

        (function init() {
            let stoneType = stoneTypes.getType(type);
            if (!stoneType) {
                stoneType = stoneTypes.getRandomType();
            }
            
            if (!isNextStone) {
                // eslint-disable-next-line no-console
                console.log(stoneType.name);
            }

            color = stoneType.color;
            stoneType.blocks.forEach(block => convertTypeBlock(block, isNextStone));

            if (stoneType.pivotBlockNumber !== null) {
                pivotBlock = blocks[stoneType.pivotBlockNumber];
                flip = stoneType.flip;
                pivotClockwise = stoneType.pivotDirection === "CW";
            }

            if (!isNextStone) {
                createGhostBlocks();
            }
        })();

        function convertTypeBlock(block, isNextStone) {
            blocks.push(blockFactory.createNew(block.x, block.y, color,
                isNextStone && constants.BLOCK_TYPE_NEXT));
        }

        function moveTo(offsetX, offsetY) {
            blocks.forEach(block => block.moveTo(offsetX, offsetY));
            updateGhostStones(offsetX, offsetY);
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

        function rotateOrFlip(x, y) {
            if (isNextRotationClockwise()) {
                rotateClockwise();
            } else {
                rotateCounterClockwise();
            }

            if (flip) {
                initalFlipDirection = !initalFlipDirection;
            }

            updateGhostStones(x, y);
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
            [...blocks, ...ghostBlocks].forEach(block => {
                block.rotateClockwise(pivotBlock.getCoords());
            });
        }

        function rotateCounterClockwise() {
            [...blocks, ...ghostBlocks].forEach(block => {
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

        function updateBlocksOfPlayground(x, y) {
            blocks.forEach(block => block.updateBlocksOfPlayground(x, y));
            destroyGhostBlocks();
        }

        function createGhostBlocks() {
            ghostBlocks = blocks.map(block => {
                return blockFactory.createNew(block.getCoords().x, block.getCoords().y, constants.GHOST_COLOR, constants.BLOCK_TYPE_GHOST);
            });
        }

        function destroyGhostBlocks() {
            ghostBlocks.forEach(ghostBlock => ghostBlock.removeAndDelete());
        }

        function destroyBlocks() {
            blocks.forEach(block => block.removeAndDelete());
        }

        function updateGhostStones(x, y) {
            if (!ghostBlocks) {
                return;
            }

            let maxY = y;
            while (isMoveToPossible(x, maxY + 1)) {
                maxY++;
            }

            ghostBlocks.forEach(ghostBlock => ghostBlock.moveTo(x, maxY));
        }

        return {
            isMoveToPossible,
            moveTo,
            isRotationOrFlipPossible,
            rotateOrFlip,
            updateBlocksOfPlayground,
            destroyBlocks
        };
    }

    return {
        createNew
    };
})();