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
var Checkbox = function (props) {
    var checked = props.checked, disabled = props.disabled, id = props.id, onChange = props.onChange;
    var checkboxGroup = react_1.useContext(CheckboxGroupContext_1.default);
    var _a = react_1.useState(id), prevId = _a[0], setPrevId = _a[1];
    var _b = react_1.useState(true), shouldTriggerCheckboxContextChange = _b[0], setShouldTriggerCheckboxContextChange = _b[1];
    var _c = react_1.useState(checked !== undefined ? checked : checkboxGroup.defaultChecked), isChecked = _c[0], setIsChecked = _c[1];
    var _d = react_1.useState(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled), isDisabled = _d[0], setIsDisabled = _d[1];
    react_1.useEffect(function () {
        checkboxGroup.assertIdDoesNotExist(id);
        return function () {
            checkboxGroup.checkboxes.delete(id);
            checkboxGroup.onCheckboxChange();
        };
    }, []);
    react_1.useEffect(function () {
        if (checked !== undefined) {
            setShouldTriggerCheckboxContextChange(true);
            setIsChecked(checked);
        }
    }, [checked, setIsChecked, setShouldTriggerCheckboxContextChange]);
    react_1.useEffect(function () {
        if (prevId !== id) {
            checkboxGroup.assertIdDoesNotExist(id);
            checkboxGroup.checkboxes.delete(prevId);
            setPrevId(id);
        }
        checkboxGroup.checkboxes.set(id, {
            isChecked: isChecked,
            isDisabled: isDisabled,
            props: props,
            setIsChecked: setIsChecked,
            setIsDisabled: setIsDisabled,
        });
        if (shouldTriggerCheckboxContextChange) {
            checkboxGroup.onCheckboxChange();
            setShouldTriggerCheckboxContextChange(false);
        }
    }, [
        id, prevId, isChecked, isDisabled, setIsChecked, setIsDisabled,
        setShouldTriggerCheckboxContextChange, checkboxGroup, shouldTriggerCheckboxContextChange,
    ]);
    var handleChange = function (event) {
        event.persist();
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
exports.default = Checkbox;
//# sourceMappingURL=Checkbox.js.map