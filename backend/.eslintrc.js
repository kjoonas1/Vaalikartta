module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
        "prefer-arrow",
        "jest"
    ],
    "rules": {
        "prefer-arrow/prefer-arrow-functions": [
            "warn",
            {
                "disallowPrototype": true,
                "singleReturnOnly": false,
                "classPropertiesAllowed": false
            }],
        "no-console": "off",
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
            "never"
        ]
    }
};