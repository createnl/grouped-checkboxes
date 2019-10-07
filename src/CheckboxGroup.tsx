import React, {
  FC, ReactElement, useState,
} from 'react';
import CheckboxGroupContext, { CheckboxEntry } from './CheckboxGroupContext';
import debounce from 'lodash.debounce';

interface CheckboxChange extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  checked: boolean;
  disabled: boolean;
  id: string;
}

interface CheckboxGroupProps {
  defaultChecked?: boolean;
  defaultDisabled?: boolean;
  onChange?: (checkboxes: CheckboxChange[]) => void;
}

const ON_CHANGE_DEBOUNCE_TIMEOUT = 100;

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  children,
  defaultChecked,
  defaultDisabled,
  onChange,
}): ReactElement => {
  const [checkboxes] = useState(new Map<string, CheckboxEntry>());
  const [allCheckerCheckboxes] = useState(new Map<string, CheckboxEntry>());

  const dispatchOnChange = (): void => {
    if (onChange === undefined) {
      return;
    }

    const checkboxChangeArray: CheckboxChange[] = [];

    checkboxes.forEach((checkbox, id): void => {
      checkboxChangeArray.push({
        ...checkbox.props,
        checked: checkbox.isChecked || false,
        disabled: checkbox.isDisabled || false,
        id,
      });
    });

    onChange(checkboxChangeArray);
  };

  const debouncedOnChange = debounce(dispatchOnChange, ON_CHANGE_DEBOUNCE_TIMEOUT);

  const setAllCheckboxesChecked = (state: boolean): void => {
    allCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(state));
    checkboxes.forEach((checkbox, key): void => {
      const clone = checkbox;
      checkbox.setIsChecked(state);
      clone.isChecked = state;
      checkboxes.set(key, clone);
    });
  };

  const allCheckboxesAreChecked = (): boolean => {
    let amountChecked = 0;

    checkboxes.forEach((checkbox): void => {
      if (checkbox.isChecked === true) {
        amountChecked += 1;
      }
    });

    return amountChecked > 0 && amountChecked === checkboxes.size;
  };

  const onCheckboxChange = (): void => {
    const allChecked = allCheckboxesAreChecked();
    allCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(allChecked));
    debouncedOnChange();
  };

  const onAllCheckerCheckboxChange = (key: string, initialized: boolean): void => {
    const allCheckerCheckbox = allCheckerCheckboxes.get(key);

    if (!allCheckerCheckbox) {
      return;
    }

    if( initialized ) {
      setAllCheckboxesChecked(allCheckerCheckbox.isChecked === true);
      debouncedOnChange();
    } else {
      setAllCheckboxesChecked(defaultChecked || allCheckboxesAreChecked());
    }
  };

  const contextValue = {
    allCheckerCheckboxes,
    checkboxes,
    defaultChecked,
    defaultDisabled,
    onAllCheckerCheckboxChange,
    onCheckboxChange,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
