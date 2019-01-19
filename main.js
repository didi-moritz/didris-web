/* exported didris */
var didris = (function() {

    let stone = null;
    let nextStone = null;
    let switchStone = null;

    let stoneDrop = 0;
    let scoreText = null;

    let switchPossible = true;

    function start() {
        // eslint-disable-next-line no-console
        console.log("Started!");
        init();
    }

    function isCurrentStoneAvailabe() {
        return stone != null;
    }

    function init() {
        initView();
        initPlayground();
        initStoneLayers();
        initControls();
        initScoreText();
        initNextStoneText();
        initSwitchStoneText();
        engine.start();
    }

    function initView() {
        globals.app = new PIXI.Application({
            width: constants.VIEW_WIDTH,
            height: constants.VIEW_HEIGHT,
            antialias: true
        });

        document.body.appendChild(globals.app.view);

        globals.app.stage = new PIXI.display.Stage();
        globals.app.stage.group.enableSort = true;
    }

    function initStoneLayers() {
        const blocksDisplayGroup = new PIXI.display.Group(100, true);
        const ghostBlocksDisplayGroup = new PIXI.display.Group(50, true);
        const generalDisplayGroup = new PIXI.display.Group(60, true);

        globals.playgroundBlocksLayer = new PIXI.display.Layer(blocksDisplayGroup);
        globals.playgroundGhostBlocksLayer = new PIXI.display.Layer(ghostBlocksDisplayGroup);
        globals.nextStoneLayer = new PIXI.display.Layer(generalDisplayGroup);
        globals.switchStoneLayer = new PIXI.display.Layer(generalDisplayGroup);

        globals.playgroundBlocksLayer.x = globals.playgroundGhostBlocksLayer.x = playground.getLeft();
        globals.playgroundBlocksLayer.y = globals.playgroundGhostBlocksLayer.y = playground.getTop();
        
        globals.nextStoneLayer.x = constants.NEXT_STONE_OFFSET_X;
        globals.nextStoneLayer.y = constants.NEXT_STONE_OFFSET_Y;
        
        globals.switchStoneLayer.x = constants.SWITCH_STONE_OFFSET_X;
        globals.switchStoneLayer.y = constants.SWITCH_STONE_OFFSET_Y;

        globals.app.stage.addChild(globals.playgroundBlocksLayer);
        globals.app.stage.addChild(globals.playgroundGhostBlocksLayer);
        globals.app.stage.addChild(globals.nextStoneLayer);
        globals.app.stage.addChild(globals.switchStoneLayer);
    }

    function initPlayground() {
        playground.init();
    }

    function initScoreText() {
        scoreText = new PIXI.Text("Score: 0", constants.FONT_STYLE);
        scoreText.x = constants.SCORE_TEXT_OFFSET_X;
        scoreText.y = constants.SCORE_TEXT_OFFSET_Y;
        globals.app.stage.addChild(scoreText);
    }

    function initNextStoneText() {
        const nextStoneText = new PIXI.Text("Next:", constants.FONT_STYLE);
        nextStoneText.x = constants.NEXT_STONE_TEXT_OFFSET_X;
        nextStoneText.y = constants.NEXT_STONE_TEXT_OFFSET_Y;
        globals.app.stage.addChild(nextStoneText);
    }

    function initSwitchStoneText() {
        const switchStoneText = new PIXI.Text("Save:", constants.FONT_STYLE);
        switchStoneText.x = constants.SWITCH_STONE_TEXT_OFFSET_X;
        switchStoneText.y = constants.SWITCH_STONE_TEXT_OFFSET_Y;
        globals.app.stage.addChild(switchStoneText);
    }

    function initControls() {
        document.addEventListener("keydown", onKeyPress);
    }

    function onKeyPress(event) {
        switch (event.keyCode) {
        case constants.KEY_RIGHT:
            moveCurrentStoneIfPossible(1, 0);
            break;
        case constants.KEY_LEFT:
            moveCurrentStoneIfPossible(-1, 0);
            break;
        case constants.KEY_UP:
            rotateOrFlipCurrentStoneIfPossible();
            break;
        case constants.KEY_DOWN:
            moveCurrentStoneOneStepDownOrCreateNewStone();
            break;
        case 27:
            audio.stopBackgroundBeat();
            engine.stop();
            break;
        case 32:
            engine.fallDown();
            break;
        case 13:
            switchStonesIfPossible();
            break;
        default:
            // eslint-disable-next-line no-console
            console.log(`keycode: ${event.keyCode}`);
        }

        updateStone();
    }

    function haveNewStone() {
        switchPossible = true;
        createAndUpdateNewStone(nextStone && nextStone.getTypeName());
        createAndUpdateNextStone();
    }

    function switchStones() {
        switchPossible = false;

        let currentStoneTypeName = stone.getTypeName();
        destroyCurrentStone();

        if (switchStone) {
            createAndUpdateNewStone(switchStone.getTypeName());
        } else {
            createAndUpdateNewStone(nextStone.getTypeName());
            createAndUpdateNextStone();
        }

        createAndUpdateSwitchStone(currentStoneTypeName);
    }

    function createAndUpdateNewStone(typeName) {
        stone = stoneFactory.createNew(typeName);
        resetStoneDrop();
        resetCurrentPosition();
        updateStone();
    }

    function createAndUpdateSwitchStone(typeName) {
        destroySwitchStone();
        switchStone = stoneFactory.createNew(typeName, constants.BLOCK_TYPE_SWITCH);
        updateSwitchStone();
    }

    function createAndUpdateNextStone() {
        destroyNextStone();
        nextStone = stoneFactory.createNew(stoneTypes.getRandomTypeName(), constants.BLOCK_TYPE_NEXT);
        updateNextStone();
    }

    function destroyCurrentStone() {
        stone.destroyBlocks();
        stone.destroyGhostBlocks();
    }

    function resetCurrentPosition() {
        globals.x = Math.floor((constants.PLAYGROUND_WIDTH - 1) / 2) - 1;
        globals.y = 0;
    }

    function updateBlocksOfPlayground() {
        stone.updateBlocksOfPlayground(globals.x, globals.y);
    }

    function checkAndRemoveFullLines() {
        const lines = playground.getFullLines();
        if (lines.length > 0) {
            const linePoints = constants.LINES_SCORE_BASE[lines.length] * (globals.level + 1);
            globals.points += linePoints + stoneDrop;
            playground.clearLines(lines);
            updateScore();
        }
    }

    function updateStone() {
        stone.moveTo(globals.x, globals.y);
    }

    function destroyNextStone() {
        if (nextStone) {
            nextStone.destroyBlocks();
        }
    }

    function destroySwitchStone() {
        if (switchStone) {
            switchStone.destroyBlocks();
        }
    }

    function updateNextStone() {
        nextStone.moveTo(0, 0);
    }

    function updateSwitchStone() {
        switchStone.moveTo(0, 0);
    }

    function moveCurrentStoneIfPossible(x, y) {
        if (isCurrentStoneMoveable(x, y)) {
            moveCurrentStone(x, y);
        }

        return false;
    }

    function rotateOrFlipCurrentStoneIfPossible() {
        if (stone.isRotationOrFlipPossible(globals.x, globals.y)) {
            stone.rotateOrFlip(globals.x, globals.y);
        }
    }

    function isCurrentStoneMoveable(x, y) {
        return stone.isMoveToPossible(globals.x + x, globals.y + y);
    }

    function moveCurrentStone(x, y) {
        globals.x += x;
        globals.y += y;

        stone.moveTo(globals.x, globals.y);
    }

    function isCurrentStoneAlreadyAtBottom() {
        return !isCurrentStoneMoveable(0, 1);
    }

    function moveCurrentStoneOneStepDown() {
        moveCurrentStoneIfPossible(0, 1);
    }

    function moveCurrentStoneOneStepDownOrCreateNewStone() {
        if (isCurrentStoneAlreadyAtBottom()) {
            updateBlocksOfPlayground();
            checkAndRemoveFullLines();
            haveNewStone();
        } else {
            moveCurrentStoneOneStepDown();
        }
    }

    function increaseStoneDrop() {
        stoneDrop += 1;
    }

    function resetStoneDrop() {
        stoneDrop = 0;
    }

    function updateScore() {
        scoreText.text = "Score: " + globals.points;
    }

    function switchStonesIfPossible() {
        if (switchPossible) {
            switchStones();
        }
    }

    return {
        start,
        isCurrentStoneAvailabe,
        haveNewStone,
        updateStone,
        moveCurrentStoneOneStepDown,
        moveCurrentStoneOneStepDownOrCreateNewStone,
        moveCurrentStoneIfPossible,
        isCurrentStoneAlreadyAtBottom,
        increaseStoneDrop,
    };
})();