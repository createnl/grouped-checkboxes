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
  checkboxes: Map<string, CheckboxEntry>;
  defaultChecked?: boolean;
  defaultDisabled?: boolean;
  onAllCheckerCheckboxChange: (key: string, initialized: boolean) => void;
  onCheckboxChange: () => void;
}>({
      allCheckerCheckboxes: new Map<string, CheckboxEntry>(),
      checkboxes: new Map<string, CheckboxEntry>(),
      defaultChecked: false,
      onAllCheckerCheckboxChange: (): void => {
          return;
      },
      onCheckboxChange: (): void => {
          return;
      },
    });
