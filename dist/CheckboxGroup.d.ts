import React, { FC } from "react";
interface CheckboxChange extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    checked: boolean;
    disabled: boolean;
}
interface CheckboxGroupProps {
    defaultChecked?: boolean;
    defaultDisabled?: boolean;
    onChange?: (checkboxes: CheckboxChange[]) => void;
}
declare const CheckboxGroup: FC<CheckboxGroupProps>;
export default CheckboxGroup;
