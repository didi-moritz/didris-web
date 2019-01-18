/* exported stoneTypes */
var stoneTypes = (function() {
    const data = [
        ["▄█▀ ", " ▄", "F", "CCW", "0xA5D6A7"],
        ["▀█▄ ", " ▄", "F", "CW", "0xFF8A65"],
        ["█▄▄ ", " ▄", "R", "CW", "0x42A5F5"],
        ["▄▄█ ", " ▄", "R", "CW", "0xF06292"],
        ["▀█▀ ", " ▀", "R", "CW", "0xFFEB3B"],
        ["▀▀▀▀", " ▀", "F", "CW", "0x7E57C2"],
        ["██  ", null, null, null, "0x4DB6AC"]
    ];

    const types = [];

    function getType(name) {
        return types[name];
    }

    function getRandomTypeName() {
        let keys = Object.keys(types);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    function getRandomType() {
        return getType(getRandomTypeName());
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
        getRandomType,
        getRandomTypeName
    };
})();