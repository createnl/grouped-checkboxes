import React from 'react';
export interface CheckboxEntry {
    isChecked?: boolean;
    setIsChecked: (checked: boolean) => void;
    isDisabled?: boolean;
    setIsDisabled: (disabled: boolean) => void;
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
declare const _default: React.Context<{
    allCheckerCheckboxes: Map<string, CheckboxEntry>;
    assertIdDoesNotExist: (id: string) => void;
    checkboxes: Map<string, CheckboxEntry>;
    defaultChecked?: boolean | undefined;
    defaultDisabled?: boolean | undefined;
    noneCheckerCheckboxes: Map<string, CheckboxEntry>;
    onAllCheckerCheckboxChange: (key: string, initialized: boolean) => void;
    onCheckboxChange: () => void;
    onNoneCheckerCheckboxChange: (key: string, initialized: boolean) => void;
}>;
export default _default;
