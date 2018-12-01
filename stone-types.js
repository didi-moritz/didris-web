/* eslint-disable no-console */
/* exported stoneTypes */
var data = `
0x00FF00
 XX
X/
###
0x00FFFF
XOX
 X
###
0xFF0000
X/XX
`;

var stoneTypes = (function() {
    let types = [];

    function getType(i) { 
        return types[i];
    }

    function readData() {
        console.log("reading data...");
        let definitions = data.split("###");
        console.log("found " + definitions.length + " defs");
        definitions.forEach(parseDefinition);
    }
    readData();

    function parseDefinition(definitionLines) {
        let lines = definitionLines.trim().split("\n");
        let color = lines[0].trim();
        let blocks = parsePattern(lines.slice(1));

        console.log("=> " + blocks);
        console.log(blocks);
        types.push({
            color,
            blocks
        });
    }

    function parsePattern(patterLines) {
        console.log("patternLines: " + patterLines);
        let blocks = [];
        for (let y = 0; y < patterLines.length; y++) {
            let line = patterLines[y];
            for (let x = 0; x < line.length; x++) {
                if (line.charAt(x) == "X") {
                    blocks.push({ x, y, rotate: false, flip: false });
                } else if (line.charAt(x) == "O") {
                    blocks.push({ x, y, rotate: true, flip: false });
                } else if (line.charAt(x) == "/") {
                    blocks.push({ x, y, rotate: false, flip: true });
                }
            }
        }
        return blocks;
    }

    return {
        getType
    };
})();