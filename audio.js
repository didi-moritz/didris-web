/* exported audio */
var audio = (function() {

    const backgroundSynth = new Tone.MembraneSynth().toMaster();
    let backgroundLoop = null;

    (function init() {
        backgroundLoop = new Tone.Loop(time => {
            backgroundSynth.triggerAttackRelease("C1", "8n", time);
        }, "2n");
    })();

    function playStart() {
        backgroundSynth.triggerAttackRelease("C4", "1n");
    }

    function startBackgroundBeat() {
        backgroundLoop.start(0);
        Tone.Transport.start("+0.1");
    }

    function stopBackgroundBeat() {
        backgroundLoop.stop();
    }

    return {
        playStart,
        startBackgroundBeat,
        stopBackgroundBeat
    };
})();