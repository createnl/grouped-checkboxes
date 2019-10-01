"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var CheckboxGroupContext_1 = __importDefault(require("./CheckboxGroupContext"));
var CheckboxGroup = function (_a) {
    var children = _a.children, defaultChecked = _a.defaultChecked, defaultDisabled = _a.defaultDisabled, onChange = _a.onChange;
    var checkboxes = react_1.useState(new Map())[0];
    var allCheckerCheckboxes = react_1.useState(new Map())[0];
    var dispatchOnChange = function () {
        if (onChange === undefined) {
            return;
        }
        var checkboxChangeArray = [];
        checkboxes.forEach(function (checkbox, id) {
            checkboxChangeArray.push(__assign(__assign({}, checkbox.props), { checked: checkbox.isChecked || false, disabled: checkbox.isDisabled || false, id: id }));
        });
        onChange(checkboxChangeArray);
    };
    var setAllCheckboxesChecked = function (state) {
        allCheckerCheckboxes.forEach(function (checkbox) { return checkbox.setIsChecked(state); });
        checkboxes.forEach(function (checkbox, key) {
            var clone = checkbox;
            checkbox.setIsChecked(state);
            clone.isChecked = state;
            checkboxes.set(key, clone);
        });
    };
    var allCheckboxesAreChecked = function () {
        var amountChecked = 0;
        checkboxes.forEach(function (checkbox) {
            if (checkbox.isChecked === true) {
                amountChecked += 1;
            }
        });
        return amountChecked > 0 && amountChecked === checkboxes.size;
    };
    var onCheckboxChange = function () {
        var allChecked = allCheckboxesAreChecked();
        allCheckerCheckboxes.forEach(function (checkbox) { return checkbox.setIsChecked(allChecked); });
        dispatchOnChange();
    };
    var onAllCheckerCheckboxChange = function (key, initialized) {
        var allCheckerCheckbox = allCheckerCheckboxes.get(key);
        if (!allCheckerCheckbox) {
            return;
        }
        if (initialized) {
            setAllCheckboxesChecked(allCheckerCheckbox.isChecked === true);
            dispatchOnChange();
        }
        else {
            setAllCheckboxesChecked(defaultChecked || allCheckboxesAreChecked());
        }
    };
    var contextValue = {
        allCheckerCheckboxes: allCheckerCheckboxes,
        checkboxes: checkboxes,
        defaultChecked: defaultChecked,
        defaultDisabled: defaultDisabled,
        onAllCheckerCheckboxChange: onAllCheckerCheckboxChange,
        onCheckboxChange: onCheckboxChange,
    };
    return (react_1.default.createElement(CheckboxGroupContext_1.default.Provider, { value: contextValue }, children));
};
exports.default = CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.js.map