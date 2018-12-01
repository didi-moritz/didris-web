module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "PIXI": false,
        "didris": false,
        "globals": false,
        "constants": false,
        "engine": false,
        "playground": false,
        "blockFactory": false,
        "stoneTypes": false,
        "stoneFactory": false,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};