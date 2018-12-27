/* exported constants */
var constants = {
    VIEW_WIDTH: 800,
    VIEW_HEIGHT: 600,
    BLOCK_IMAGE: "./img/block.png",
    BLOCK_SIZE: 20,
    PLAYGROUND_HEIGHT: 20,
    PLAYGROUND_WIDTH: 10,
    PLAYGROUND_BORDER_WIDTH: 2,
    PLAYGROUND_BORDER_COLOR: 0x0088FF,
    KEY_UP: 38,
    KEY_DOWN: 40,
    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    LINES_SCORE_BASE: {
        1: 40,
        2: 100,
        3: 300,
        4: 1200
    },
    scoreFontStyle: new PIXI.TextStyle({
        fontFamily: "monospace",
        fontSize: 24,
        fontWeight: "bold",
        fill: "#81B1B1",
        dropShadow: true,
        dropShadowColor: "#006666",
        dropShadowDistance: 3
    })
};