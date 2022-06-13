const {defaults} = require('jest-config');

module.exports = {
    moduleFileExtensions: ['ts', 'tsx', ...defaults.moduleFileExtensions],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
};
