"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* istanbul ignore file */
var react_1 = __importDefault(require("react"));
exports.default = react_1.default.createContext({
    allCheckerCheckboxes: new Map(),
    checkboxes: new Map(),
    defaultChecked: false,
    onAllCheckerCheckboxChange: function () {
        return;
    },
    onCheckboxChange: function () {
        return;
    },
});
//# sourceMappingURL=CheckboxGroupContext.js.map