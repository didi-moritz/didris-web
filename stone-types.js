/* eslint-disable no-console */
/* exported stoneTypes */
var stoneTypes = (function() {
    const data = [
        ["▄█▀ ", " ▄", "F", "0x00FF00"],
        ["▀█▀ ", " ▀", "R", "0x00FFFF"],
        ["▀▀▀▀", " ▀", "F", "0xFF0000"]
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
        console.log(definition);
        let name = definition[0].trim();
        let color = definition[3];
        let blocks = parsePattern(name);
        let pivotBlockNumber = parsePatternOfPivotBlock(definition[1], blocks);
        let flip = definition[2] == "F";

        types[name] = {
            name,
            color,
            blocks,
            pivotBlockNumber,
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

    function parsePatternOfPivotBlock(pattern, blocks) {

    }

    return {
        getType,
        getRandomType
    };
})();