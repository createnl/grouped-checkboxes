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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var CheckboxGroupContext_1 = __importDefault(require("./CheckboxGroupContext"));
var uuid_1 = __importDefault(require("./uuid"));
var NoneCheckerCheckbox = react_1.forwardRef(function (props, ref) {
    var disabled = props.disabled, onChange = props.onChange;
    var id = react_1.useState(uuid_1.default())[0];
    var checkboxGroup = react_1.useContext(CheckboxGroupContext_1.default);
    var _a = react_1.useState(false), initialized = _a[0], setInitialized = _a[1];
    var _b = react_1.useState(true), shouldTriggerCheckboxContextChange = _b[0], setShouldTriggerCheckboxContextChange = _b[1];
    var _c = react_1.useState(checkboxGroup.defaultChecked !== undefined ? !checkboxGroup.defaultChecked : undefined), isChecked = _c[0], setIsChecked = _c[1];
    var _d = react_1.useState(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled), isDisabled = _d[0], setIsDisabled = _d[1];
    react_1.useEffect(function () {
        checkboxGroup.assertIdDoesNotExist(id);
        return function () {
            checkboxGroup.noneCheckerCheckboxes.delete(id);
        };
    }, []);
    react_1.useEffect(function () {
        checkboxGroup.noneCheckerCheckboxes.set(id, {
            isChecked: isChecked,
            isDisabled: isDisabled,
            props: props,
            setIsChecked: setIsChecked,
            setIsDisabled: setIsDisabled,
        });
        if (shouldTriggerCheckboxContextChange) {
            checkboxGroup.onNoneCheckerCheckboxChange(id, initialized);
            setShouldTriggerCheckboxContextChange(false);
        }
        if (!initialized) {
            setInitialized(true);
        }
    }, [
        id, isChecked, isDisabled, setIsChecked, setIsDisabled, initialized,
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
    return (react_1.default.createElement("input", __assign({ type: "checkbox" }, props, { ref: ref, onChange: handleChange, checked: isChecked !== undefined ? isChecked : false, disabled: isDisabled !== undefined ? isDisabled : false })));
});
exports.default = NoneCheckerCheckbox;
//# sourceMappingURL=NoneCheckerCheckbox.js.map