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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var react_1 = __importStar(require("react"));
var CheckboxGroupContext_1 = __importDefault(require("./CheckboxGroupContext"));
var ON_CHANGE_DEBOUNCE_TIMEOUT = 100;
var CheckboxGroup = function (_a) {
    var children = _a.children, defaultChecked = _a.defaultChecked, defaultDisabled = _a.defaultDisabled, onChange = _a.onChange;
    var checkboxes = react_1.useState(new Map())[0];
    var allCheckerCheckboxes = react_1.useState(new Map())[0];
    var noneCheckerCheckboxes = react_1.useState(new Map())[0];
    var dispatchOnChange = function () {
        if (onChange === undefined) {
            return;
        }
        var checkboxChangeArray = [];
        checkboxes.forEach(function (checkbox) {
            checkboxChangeArray.push(__assign(__assign({}, checkbox.props), { checked: checkbox.isChecked || false, disabled: checkbox.isDisabled || false }));
        });
        onChange(checkboxChangeArray);
    };
    var debouncedOnChange = lodash_debounce_1.default(dispatchOnChange, ON_CHANGE_DEBOUNCE_TIMEOUT);
    var setAllCheckboxesChecked = function (state) {
        allCheckerCheckboxes.forEach(function (checkbox) { return checkbox.setIsChecked(state); });
        noneCheckerCheckboxes.forEach(function (checkbox) { return checkbox.setIsChecked(!state); });
        checkboxes.forEach(function (checkbox, key) {
            var clone = checkbox;
            checkbox.setIsChecked(state);
            clone.isChecked = state;
            checkboxes.set(key, clone);
        });
    };
    var amountChecked = function () {
        var count = 0;
        checkboxes.forEach(function (checkbox) {
            if (checkbox.isChecked === true) {
                count += 1;
            }
        });
        return count;
    };
    var allCheckboxesAreChecked = function () {
        var checkedCount = amountChecked();
        return checkedCount > 0 && checkedCount === checkboxes.size;
    };
    var allCheckboxesAreNotChecked = function () { return amountChecked() === 0; };
    var onCheckboxChange = function () {
        var allChecked = allCheckboxesAreChecked();
        allCheckerCheckboxes.forEach(function (checkbox) { return checkbox.setIsChecked(allChecked); });
        var noneChecked = allCheckboxesAreNotChecked();
        noneCheckerCheckboxes.forEach(function (checkbox) { return checkbox.setIsChecked(noneChecked); });
        debouncedOnChange();
    };
    var onAllCheckerCheckboxChange = function (key, initialized) {
        var allCheckerCheckbox = allCheckerCheckboxes.get(key);
        if (!allCheckerCheckbox) {
            return;
        }
        if (initialized) {
            setAllCheckboxesChecked(allCheckerCheckbox.isChecked === true);
            debouncedOnChange();
        }
        else {
            setAllCheckboxesChecked(defaultChecked || allCheckboxesAreChecked());
        }
    };
    var onNoneCheckerCheckboxChange = function (key, initialized) {
        var noneCheckerCheckbox = noneCheckerCheckboxes.get(key);
        if (!noneCheckerCheckbox) {
            return;
        }
        if (initialized && noneCheckerCheckbox.isChecked) {
            setAllCheckboxesChecked(false);
            debouncedOnChange();
        }
        else if (!noneCheckerCheckbox.isChecked && allCheckboxesAreNotChecked()) {
            noneCheckerCheckbox.setIsChecked(true);
        }
    };
    var hasCheckbox = function (id) { return checkboxes.has(id) || allCheckerCheckboxes.has(id) || noneCheckerCheckboxes.has(id); };
    var assertIdDoesNotExist = function (subject) {
        if (hasCheckbox(subject)) {
            throw new Error("Duplicate id " + subject + " in CheckboxGroup");
        }
    };
    var contextValue = {
        allCheckerCheckboxes: allCheckerCheckboxes,
        assertIdDoesNotExist: assertIdDoesNotExist,
        checkboxes: checkboxes,
        defaultChecked: defaultChecked,
        defaultDisabled: defaultDisabled,
        noneCheckerCheckboxes: noneCheckerCheckboxes,
        onAllCheckerCheckboxChange: onAllCheckerCheckboxChange,
        onCheckboxChange: onCheckboxChange,
        onNoneCheckerCheckboxChange: onNoneCheckerCheckboxChange,
    };
    return (react_1.default.createElement(CheckboxGroupContext_1.default.Provider, { value: contextValue }, children));
};
exports.default = CheckboxGroup;
//# sourceMappingURL=CheckboxGroup.js.map