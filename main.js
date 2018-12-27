/* exported didris */
var didris = (function() {

    let stone = null;
    let stoneDrop = 0;
    let scoreText = null;

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
        initControls();
        initScoreText();
        engine.start();
    }

    function initView() {
        globals.app = new PIXI.Application({
            width: constants.VIEW_WIDTH,
            height: constants.VIEW_HEIGHT,
            antialias: true
        });
        
        document.body.appendChild(globals.app.view);
    }

    function initPlayground() {
        playground.init();
    }

    function initScoreText() {
        scoreText = new PIXI.Text("Score: 0", constants.scoreFontStyle);
        scoreText.x = 20;
        scoreText.y = 20;
        globals.app.stage.addChild(scoreText);
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
        default:
            // eslint-disable-next-line no-console
            console.log(`keycode: ${event.keyCode}`);
        }

        updateStone();
    }

    function haveNewStone() {
        stone = stoneFactory.createNew();
        resetStoneDrop();
        resetCurrentPosition();
        updateStone();
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
            console.log(globals.points);
        }
    }

    function updateStone() {
        stone.moveTo(globals.x, globals.y);
    }

    function moveCurrentStoneIfPossible(x, y) {
        if (isCurrentStoneMoveable(x, y)) {
            moveCurrentStone(x, y);
        }

        return false;
    }

    function rotateOrFlipCurrentStoneIfPossible() {
        if (stone.isRotationOrFlipPossible(globals.x, globals.y)) {
            stone.rotateOrFlip();
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