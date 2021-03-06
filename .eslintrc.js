module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended", // eslint recommended configuration
        "plugin:react/recommended",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020, // JS with 2020 version of ECMAScript syntax
        "sourceType": "module"
    },
    "plugins": [
        "react",
        // eslint-plugin-jest-dom
        "jest-dom",
        // eslint-plugin-testing-library
        "testing-library"
    ],
    "rules": {
        "no-console": "warn", // warn at the use of console log
        "react/display-name": "warn"
    },
    // "overrides": [
    //     {
    //         "files": ['**/tests/**'],
    //         "settings": {
    //             'import/resolver': {
    //                 "jest": {
    //                     "jestConfigFile": path.join(__dirname, './jest.config.js')
    //                 }
    //             }
    //         }
    //     }
    // ]
};
