/* exported stoneFactory */
var stoneFactory = (function () {
    function createNew(type) {
        let color;
        let blocks = [];
        let pivotBlock = null;
        let flip = true;

        function init() {
            let stoneType = stoneTypes.getRandomType();

            color = stoneType.color;
            stoneType.blocks.forEach(convertTypeBlock);
            flip = stoneType.flip;
        }
        init();

        function convertTypeBlock(block) {
            blocks.push(blockFactory.createNew(block.x, block.y, color));
        }

        function moveTo(offsetX, offsetY) {
            blocks.forEach(block => block.moveTo(offsetX, offsetY));
        }

        function isMoveToPossible(x, y) {
            return blocks.every(block => block.isMoveToPossible(x, y));
        }

        return {
            moveTo,
            isMoveToPossible
        };
    }

    return {
        createNew
    };
})();