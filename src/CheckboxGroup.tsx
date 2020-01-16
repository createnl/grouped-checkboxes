import debounce from "lodash.debounce";
import React, {
  FC, ReactElement, useState,
} from "react";
import CheckboxGroupContext, { CheckboxEntry } from "./CheckboxGroupContext";

interface CheckboxChange extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  checked: boolean;
  disabled: boolean;
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
  const [noneCheckerCheckboxes] = useState(new Map<string, CheckboxEntry>());

  const dispatchOnChange = (): void => {
    if (onChange === undefined) {
      return;
    }

    const checkboxChangeArray: CheckboxChange[] = [];

    checkboxes.forEach((checkbox): void => {
      checkboxChangeArray.push({
        ...checkbox.props,
        checked: checkbox.isChecked || false,
        disabled: checkbox.isDisabled || false,
      });
    });

    onChange(checkboxChangeArray);
  };

  const debouncedOnChange = debounce(dispatchOnChange, ON_CHANGE_DEBOUNCE_TIMEOUT);

  const setAllCheckboxesChecked = (state: boolean): void => {
    allCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(state));
    noneCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(!state));
    checkboxes.forEach((checkbox, key): void => {
      const clone = checkbox;
      checkbox.setIsChecked(state);
      clone.isChecked = state;
      checkboxes.set(key, clone);
    });
  };

  const amountChecked = (): number => {
    let count = 0;

    checkboxes.forEach((checkbox): void => {
      if (checkbox.isChecked === true) {
        count += 1;
      }
    });

    return count;
  };

  const allCheckboxesAreChecked = (): boolean => {
    const checkedCount = amountChecked();

    return checkedCount > 0 && checkedCount === checkboxes.size;
  };

  const allCheckboxesAreNotChecked = (): boolean => amountChecked() === 0;

  const onCheckboxChange = (): void => {
    const allChecked = allCheckboxesAreChecked();
    allCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(allChecked));

    const noneChecked = allCheckboxesAreNotChecked();
    noneCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(noneChecked));

    debouncedOnChange();
  };

  const onAllCheckerCheckboxChange = (key: string, initialized: boolean): void => {
    const allCheckerCheckbox = allCheckerCheckboxes.get(key);

    if (!allCheckerCheckbox) {
      return;
    }

    if (initialized) {
      setAllCheckboxesChecked(allCheckerCheckbox.isChecked === true);
      debouncedOnChange();
    } else {
      setAllCheckboxesChecked(defaultChecked || allCheckboxesAreChecked());
    }
  };

  const onNoneCheckerCheckboxChange = (key: string, initialized: boolean): void => {
    const noneCheckerCheckbox = noneCheckerCheckboxes.get(key);

    if (!noneCheckerCheckbox) {
      return;
    }

    if (initialized && noneCheckerCheckbox.isChecked) {
      setAllCheckboxesChecked(false);
      debouncedOnChange();
    } else if (!noneCheckerCheckbox.isChecked && allCheckboxesAreNotChecked()) {
      noneCheckerCheckbox.setIsChecked(true);
    }
  };

  const hasCheckbox = (id: string) => checkboxes.has(id) || allCheckerCheckboxes.has(id) || noneCheckerCheckboxes.has(id);

  const assertIdDoesNotExist = (subject: string): void => {
    if (hasCheckbox(subject)) {
      throw new Error(`Duplicate id ${subject} in CheckboxGroup`);
    }
  };

  const contextValue = {
    allCheckerCheckboxes,
    assertIdDoesNotExist,
    checkboxes,
    defaultChecked,
    defaultDisabled,
    noneCheckerCheckboxes,
    onAllCheckerCheckboxChange,
    onCheckboxChange,
    onNoneCheckerCheckboxChange,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
