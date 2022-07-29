/* istanbul ignore file */
import React from 'react';

export interface CheckboxEntry {
    isChecked?: boolean;
    setIsChecked: (checked: boolean) => void;
    isDisabled?: boolean;
    setIsDisabled: (disabled: boolean) => void;
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

interface CheckboxGroupContextProps {
    allCheckerCheckboxes: Map<string, CheckboxEntry>;
    assertIdDoesNotExist:(id: string) => void;
    checkboxes: Map<string, CheckboxEntry>;
    defaultChecked?: boolean;
    defaultDisabled?: boolean;
    noneCheckerCheckboxes: Map<string, CheckboxEntry>;
    onAllCheckerCheckboxChange: (key: string, initialized: boolean) => void;
    onCheckboxChange: () => void;
    onNoneCheckerCheckboxChange: (key: string, initialized: boolean) => void;
}

export default React.createContext<CheckboxGroupContextProps>({
    allCheckerCheckboxes: new Map<string, CheckboxEntry>(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    assertIdDoesNotExist: (): void => {},
    checkboxes: new Map<string, CheckboxEntry>(),
    defaultChecked: false,
    defaultDisabled: false,
    noneCheckerCheckboxes: new Map<string, CheckboxEntry>(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onAllCheckerCheckboxChange: (): void => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCheckboxChange: (): void => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onNoneCheckerCheckboxChange: (): void => {},
});
