/* exported stoneTypes */
var stoneTypes = (function() {
    const data = [
        ["▄█▀ ", " ▄", "F", "CCW", "0x00FF00"],
        ["▀█▄ ", " ▄", "F", "CW", "0x00FFFF"],
        ["█▄▄ ", " ▄", "R", "CW", "0x00FFFF"],
        ["▄▄█ ", " ▄", "R", "CW", "0x00FFFF"],
        ["▀█▀ ", " ▀", "R", "CW", "0x00FFFF"],
        ["▀▀▀▀", " ▀", "F", "CW", "0xFF0000"],
        ["██  ", null, null, null, "0xFF0000"]
    ];

    const types = [];

    function getType(name) {
        return types[name];
    }

    function getRandomType() {
        let keys = Object.keys(types);
        let key = keys[Math.floor(Math.random() * keys.length)];
        return getType(key);
    }

    function readData() {
        data.forEach(parseDefinition);
    }
    readData();

    function parseDefinition(definition) {
        let name = definition[0].trim();
        let color = definition[4];
        let blocks = parsePattern(name);
        let flip = null;
        let pivotDirection = definition[3];
        let pivotBlockNumber = null;
        if (definition[2] != null) {
            flip = definition[2] == "F";
            pivotBlockNumber = parsePatternOfPivotBlockAndGetBlockNumber(definition[1], blocks);
        }

        types[name] = {
            name,
            color,
            blocks,
            pivotBlockNumber,
            pivotDirection,
            flip
        };
    }

    function parsePattern(pattern) {
        let blocks = [];
        for (let x = 0; x < pattern.length; x++) {
            let c = pattern[x];
            
            if (c == "▀" || c == "█") {
                blocks.push({ x, y: 0});
            }
            
            if (c == "▄" || c == "█") {
                blocks.push({ x, y: 1});
            }
        }

        return blocks;
    }

    function parsePatternOfPivotBlockAndGetBlockNumber(pattern, blocks) {
        let coords = null;
        for (let x = 0; pattern && x < pattern.length; x++) {
            let c = pattern[x];
            
            if (c == "▀") {
                coords = {x, y: 0};
            }
            
            if (c == "▄") {
                coords = {x, y: 1};
            }
        }

        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].x == coords.x && blocks[i].y == coords.y) {
                return i;
            }
        }

        return null;
    }

    return {
        getType,
        getRandomType
    };
})();