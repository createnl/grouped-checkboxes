"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
var react_1 = __importDefault(require("react"));
exports.default = react_1.default.createContext({
    allCheckerCheckboxes: new Map(),
    assertIdDoesNotExist: function () {
        return;
    },
    checkboxes: new Map(),
    defaultChecked: false,
    defaultDisabled: false,
    noneCheckerCheckboxes: new Map(),
    onAllCheckerCheckboxChange: function () {
        return;
    },
    onCheckboxChange: function () {
        return;
    },
    onNoneCheckerCheckboxChange: function () {
        return;
    },
});
//# sourceMappingURL=CheckboxGroupContext.js.map