import React, {
  FC, ReactElement, useContext, useEffect, useState,
} from 'react';
import CheckboxGroupContext from './CheckboxGroupContext';

interface NoneCheckerCheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  checked?: never;
}

const NoneCheckerCheckbox: FC<NoneCheckerCheckboxProps> = (props): ReactElement => {
  const {
    disabled,
    id,
    onChange,
  } = props;

  const checkboxGroup = useContext(CheckboxGroupContext);

  const [prevId, setPrevId] = useState<string>(id);
  const [initialized, setInitialized] = useState(false);
  const [shouldTriggerCheckboxContextChange, setShouldTriggerCheckboxContextChange] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean|undefined>(checkboxGroup.defaultChecked !== undefined ? !checkboxGroup.defaultChecked : undefined);
  const [isDisabled, setIsDisabled] = useState(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled);

  useEffect((): () => void => {
    checkboxGroup.assertIdDoesNotExist(id);
    return (): void => {
      checkboxGroup.noneCheckerCheckboxes.delete(id);
    }
  }, []);

  useEffect((): void => {
    if (prevId !== id) {
      checkboxGroup.assertIdDoesNotExist(id);
      checkboxGroup.noneCheckerCheckboxes.delete(prevId);
      setInitialized(false);
      setPrevId(id);
    }

    checkboxGroup.noneCheckerCheckboxes.set(id, {
      isChecked,
      isDisabled,
      props,
      setIsChecked,
      setIsDisabled,
    });

    if (shouldTriggerCheckboxContextChange) {
      checkboxGroup.onNoneCheckerCheckboxChange(id, initialized);
      setShouldTriggerCheckboxContextChange(false);
    }

    if (!initialized) {
      setInitialized(true);
    }
  }, [
    id, prevId, isChecked, isDisabled, setIsChecked, setIsDisabled, initialized,
    setShouldTriggerCheckboxContextChange, checkboxGroup, shouldTriggerCheckboxContextChange,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!isDisabled) {
      setShouldTriggerCheckboxContextChange(true);
      setIsChecked(event.target.checked);
    }

    if (onChange !== undefined) {
      onChange(event);
    }
  };

  return (
    <input
      type="checkbox"
      {...props}
      onChange={handleChange}
      checked={isChecked !== undefined ? isChecked : false}
      disabled={isDisabled !== undefined ? isDisabled : false}
    />
  );
};

export default NoneCheckerCheckbox;
