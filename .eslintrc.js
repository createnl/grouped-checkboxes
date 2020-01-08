module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "jest",
  ],
  "rules": {
  }
};
