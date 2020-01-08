/* istanbul ignore file */
import React from 'react';

export interface CheckboxEntry {
  isChecked?: boolean;
  setIsChecked: (checked: boolean) => void;
  isDisabled?: boolean;
  setIsDisabled: (disabled: boolean) => void;
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export default React.createContext<{
  allCheckerCheckboxes: Map<string, CheckboxEntry>;
  assertIdDoesNotExist: (id: string) => void;
  checkboxes: Map<string, CheckboxEntry>;
  defaultChecked?: boolean;
  defaultDisabled?: boolean;
  noneCheckerCheckboxes: Map<string, CheckboxEntry>;
  onAllCheckerCheckboxChange: (key: string, initialized: boolean) => void;
  onCheckboxChange: () => void;
  onNoneCheckerCheckboxChange: (key: string, initialized: boolean) => void;
}>({
      allCheckerCheckboxes: new Map<string, CheckboxEntry>(),
      assertIdDoesNotExist: (): void => {

      },
      checkboxes: new Map<string, CheckboxEntry>(),
      defaultChecked: false,
      defaultDisabled: false,
      noneCheckerCheckboxes: new Map<string, CheckboxEntry>(),
      onAllCheckerCheckboxChange: (): void => {

      },
      onCheckboxChange: (): void => {

      },
      onNoneCheckerCheckboxChange: (): void => {

      },
    });
