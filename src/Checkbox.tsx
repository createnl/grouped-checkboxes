import React, {
  FC, ReactElement, useContext, useEffect, useState,
} from 'react';
import CheckboxGroupContext from './CheckboxGroupContext';

interface CheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
}

const Checkbox: FC<CheckboxProps> = (props): ReactElement => {
  const {
    checked,
    disabled,
    id,
    onChange,
    onClick,
  } = props;

  const checkboxGroup = useContext(CheckboxGroupContext);

  const [prevId, setPrevId] = useState<string>(id);
  const [shouldTriggerCheckboxContextChange, setShouldTriggerCheckboxContextChange] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean|undefined>(checked !== undefined ? checked : checkboxGroup.defaultChecked);
  const [isDisabled, setIsDisabled] = useState<boolean|undefined>(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled);
  const [isShiftKeyClicked, setIsShiftKeyClicked] = useState<boolean>(false);

  useEffect((): () => void => {
    checkboxGroup.assertIdDoesNotExist(id);
    return (): void => {
      checkboxGroup.checkboxes.delete(id);
      checkboxGroup.onCheckboxChange();
    };
  }, []);

  useEffect((): void => {
    if (checked !== undefined) {
      setShouldTriggerCheckboxContextChange(true);
      setIsChecked(checked);
    }
  }, [checked, setIsChecked, setShouldTriggerCheckboxContextChange]);

  useEffect((): void => {
    if (prevId !== id) {
      checkboxGroup.assertIdDoesNotExist(id);
      checkboxGroup.checkboxes.delete(prevId);
      setPrevId(id);
    }

    checkboxGroup.checkboxes.set(id, {
      isChecked,
      isDisabled,
      props,
      setIsChecked,
      setIsDisabled,
    });

    if (shouldTriggerCheckboxContextChange) {
      if (isShiftKeyClicked) {
        checkboxGroup.toggleShiftGroup(id);
      } else {
        checkboxGroup.onCheckboxChange(id);
      }

      setShouldTriggerCheckboxContextChange(false);
    }
  }, [
    id, prevId, isChecked, isDisabled, setIsChecked, setIsDisabled,
    setShouldTriggerCheckboxContextChange, checkboxGroup, shouldTriggerCheckboxContextChange,
  ]);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsShiftKeyClicked(event.shiftKey);

    if (onClick !== undefined) {
      onClick(event);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      onClick={handleClick}
      onChange={handleChange}
      checked={isChecked !== undefined ? isChecked : false}
      disabled={isDisabled !== undefined ? isDisabled : false}
    />
  );
};

export default Checkbox;
