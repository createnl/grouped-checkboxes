import React, { FC, PropsWithChildren } from 'react';
export interface CheckboxChange extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    checked: boolean;
    disabled: boolean;
}
interface CheckboxGroupProps {
    defaultChecked?: boolean;
    defaultDisabled?: boolean;
    onChange?: (checkboxes: CheckboxChange[]) => void;
}
declare const CheckboxGroup: FC<PropsWithChildren<CheckboxGroupProps>>;
export default CheckboxGroup;
