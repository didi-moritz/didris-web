/* exported stoneFactory */
var stoneFactory = (function () {
    function createNew(type) {
        let color;
        let blocks = [];
        let pivotBlock = null;
        let flip = true;

        function init() {
            let stoneType = stoneTypes.getType(type);

            color = stoneType.color;
            stoneType.blocks.forEach(convertTypeBlock);
            stoneType.blocks.forEach(updateFlipOrRotateMode);
        }
        init();

        function convertTypeBlock(block) {
            blocks.push(blockFactory.createNew(block.x, block.y, color));
        }

        function updateFlipOrRotateMode(block) {
            if (block.rotate) {
                flip = false;
            }
        }

        function moveTo(offsetX, offsetY) {
            blocks.forEach(block => block.moveTo(offsetX, offsetY));
        }

        return {
            moveTo
        };
    }

    return {
        createNew
    };
})();