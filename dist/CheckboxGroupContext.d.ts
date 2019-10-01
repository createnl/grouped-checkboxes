import React from 'react';
export interface CheckboxEntry {
    isChecked?: boolean;
    setIsChecked: (checked: boolean) => void;
    isDisabled?: boolean;
    setIsDisabled: (disabled: boolean) => void;
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
        id: string;
    };
}
declare const _default: React.Context<{
    allCheckerCheckboxes: Map<string, CheckboxEntry>;
    checkboxes: Map<string, CheckboxEntry>;
    defaultChecked?: boolean | undefined;
    defaultDisabled?: boolean | undefined;
    onAllCheckerCheckboxChange: (key: string, initialized: boolean) => void;
    onCheckboxChange: () => void;
}>;
export default _default;
