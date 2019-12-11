import debounce from 'lodash.debounce';
import React, {
  FC, ReactElement, ReactNode, useEffect, useState,
} from 'react';
import CheckboxGroupContext, { CheckboxEntry } from './CheckboxGroupContext';

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

const objectIsCheckbox = (value: any): value is ReactElement =>
    typeof value === 'object'
    && 'type' in value
    && typeof value.type === 'function'
    && value.type.name === 'Checkbox';

const objectHasChildren = (value: any): value is ReactElement =>
    typeof value === 'object'
    && 'props' in value
    && value.props.children;

const getChildCheckboxes = (childNodes: ReactNode[]): string[] => {
  const checkboxList: string[] = [];

  if (!Array.isArray(childNodes)){
    childNodes = [childNodes];
  }

  childNodes.forEach((node => {
    if (objectIsCheckbox(node)) {
      checkboxList.push(node.props.id);
    } else if (objectHasChildren(node)) {
      checkboxList.push(
        ...getChildCheckboxes(node.props.children)
      );
    }
  }));

  return checkboxList;
};

const ON_CHANGE_DEBOUNCE_TIMEOUT = 50;

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  children,
  defaultChecked,
  defaultDisabled,
  onChange,
}): ReactElement => {
  const [checkboxes] = useState(new Map<string, CheckboxEntry>());
  const [allCheckerCheckboxes] = useState(new Map<string, CheckboxEntry>());
  const [noneCheckerCheckboxes] = useState(new Map<string, CheckboxEntry>());
  const [lastToggledId, setLastToggledId] = useState<string>();
  const [orderedIdList, setOrderedIdList] = useState(getChildCheckboxes(children as ReactNode[] || []));

  useEffect(() => {
    setOrderedIdList(getChildCheckboxes(children as ReactNode[] || []));
  }, [checkboxes]);

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

  const onCheckboxChange = (key?: string): void => {
    if (key) {
      setLastToggledId(key);
    }

    const allChecked = allCheckboxesAreChecked();
    allCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(allChecked));

    const noneChecked = allCheckboxesAreNotChecked();
    noneCheckerCheckboxes.forEach((checkbox): void => checkbox.setIsChecked(noneChecked));

    debouncedOnChange();
  };

  const toggleShiftGroup = (key: string): void => {
    const endCheckbox = checkboxes.get(key);

    if (!endCheckbox || lastToggledId === undefined) {
      return;
    }

    const start = orderedIdList.indexOf(lastToggledId);
    const end = orderedIdList.indexOf(key);
    const toggleCheckboxes = orderedIdList.slice(start < end ? start : end, (end > start ? end : start) + 1);

    toggleCheckboxes.forEach((id) => {
      const toggleCheckbox = checkboxes.get(id);
      if (toggleCheckbox) {
        toggleCheckbox.setIsChecked(endCheckbox.isChecked || false);
      }
    });

    onCheckboxChange(key);

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
    toggleShiftGroup,
  };

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      {children}
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
