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
var AllCheckerCheckbox = function (props) {
    var disabled = props.disabled, id = props.id, onChange = props.onChange;
    var checkboxGroup = react_1.useContext(CheckboxGroupContext_1.default);
    var _a = react_1.useState(id), prevId = _a[0], setPrevId = _a[1];
    var _b = react_1.useState(false), initialized = _b[0], setInitialized = _b[1];
    var _c = react_1.useState(true), shouldTriggerCheckboxContextChange = _c[0], setShouldTriggerCheckboxContextChange = _c[1];
    var _d = react_1.useState(checkboxGroup.defaultChecked), isChecked = _d[0], setIsChecked = _d[1];
    var _e = react_1.useState(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled), isDisabled = _e[0], setIsDisabled = _e[1];
    var assertIdDoesNotExist = function (subject) {
        if (checkboxGroup.checkboxes.has(subject) || checkboxGroup.allCheckerCheckboxes.has(subject)) {
            throw new Error("Duplicate id " + subject + " in CheckboxGroup");
        }
    };
    react_1.useEffect(function () {
        assertIdDoesNotExist(id);
        return function () {
            checkboxGroup.allCheckerCheckboxes.delete(id);
        };
    }, []);
    react_1.useEffect(function () {
        if (prevId !== id) {
            assertIdDoesNotExist(id);
            checkboxGroup.allCheckerCheckboxes.delete(prevId);
            setInitialized(false);
            setPrevId(id);
        }
        checkboxGroup.allCheckerCheckboxes.set(id, {
            isChecked: isChecked,
            isDisabled: isDisabled,
            props: props,
            setIsChecked: setIsChecked,
            setIsDisabled: setIsDisabled,
        });
        if (shouldTriggerCheckboxContextChange) {
            checkboxGroup.onAllCheckerCheckboxChange(id, initialized);
            setShouldTriggerCheckboxContextChange(false);
        }
        if (!initialized) {
            setInitialized(true);
        }
    }, [
        id, prevId, isChecked, isDisabled, setIsChecked, setIsDisabled, initialized,
        setShouldTriggerCheckboxContextChange, checkboxGroup, shouldTriggerCheckboxContextChange,
    ]);
    var handleChange = function (event) {
        if (!isDisabled) {
            setShouldTriggerCheckboxContextChange(true);
            setIsChecked(event.target.checked);
        }
        if (onChange !== undefined) {
            onChange(event);
        }
    };
    return (react_1.default.createElement("input", __assign({ type: "checkbox" }, props, { onChange: handleChange, checked: isChecked !== undefined ? isChecked : false, disabled: isDisabled !== undefined ? isDisabled : false })));
};
exports.default = AllCheckerCheckbox;
//# sourceMappingURL=AllCheckerCheckbox.js.map