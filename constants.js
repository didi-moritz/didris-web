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
    GHOST_COLOR: 0x555B66,
    BLOCK_TYPE_NORMAL: 0,
    BLOCK_TYPE_GHOST: 1,
    BLOCK_TYPE_NEXT: 2,
    SCORE_TEXT_OFFSET_X: 50,
    SCORE_TEXT_OFFSET_Y: 30,
    NEXT_STONE_OFFSET_X: 150,
    NEXT_STONE_OFFSET_Y: 100,
    NEXT_STONE_TEXT_OFFSET_X: 50,
    NEXT_STONE_TEXT_OFFSET_Y: 95,
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
    FONT_STYLE: new PIXI.TextStyle({
        fontFamily: "monospace",
        fontSize: 24,
        fontWeight: "bold",
        fill: "#81B1B1",
        dropShadow: true,
        dropShadowColor: "#006666",
        dropShadowDistance: 3
    })
};