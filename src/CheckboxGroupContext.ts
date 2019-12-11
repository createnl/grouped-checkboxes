/* istanbul ignore file */
import React from 'react';

export interface CheckboxEntry {
    isChecked?: boolean;
    setIsChecked: (checked: boolean) => void;
    isDisabled?: boolean;
    setIsDisabled: (disabled: boolean) => void;
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { id: string };
}

export default React.createContext<{
    allCheckerCheckboxes: Map<string, CheckboxEntry>;
    assertIdDoesNotExist: (id: string) => void;
    checkboxes: Map<string, CheckboxEntry>;
    defaultChecked?: boolean;
    defaultDisabled?: boolean;
    noneCheckerCheckboxes: Map<string, CheckboxEntry>;
    onAllCheckerCheckboxChange: (key: string, initialized: boolean) => void;
    onCheckboxChange: (key?: string) => void;
    onNoneCheckerCheckboxChange: (key: string, initialized: boolean) => void;
    toggleShiftGroup: (key: string) => void;
}>({
    allCheckerCheckboxes: new Map<string, CheckboxEntry>(),
    assertIdDoesNotExist: (): void => {
        return;
    },
    checkboxes: new Map<string, CheckboxEntry>(),
    defaultChecked: false,
    defaultDisabled: false,
    noneCheckerCheckboxes: new Map<string, CheckboxEntry>(),
    onAllCheckerCheckboxChange: (): void => {
        return;
    },
    onCheckboxChange: (): void => {
        return;
    },
    onNoneCheckerCheckboxChange: (): void => {
        return;
    },
    toggleShiftGroup: (): void => {
        return;
    }
});
