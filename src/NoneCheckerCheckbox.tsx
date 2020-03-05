import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import CheckboxGroupContext from './CheckboxGroupContext';
import uuid from "./uuid";

type NoneCheckerCheckboxProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & RefAttributes<HTMLInputElement>, 'checked'>

const NoneCheckerCheckbox: ForwardRefExoticComponent<NoneCheckerCheckboxProps> = forwardRef((props, ref): ReactElement => {
  const {
    disabled,
    onChange,
  } = props;

  const [id] = useState(uuid());
  const checkboxGroup = useContext(CheckboxGroupContext);

  const [initialized, setInitialized] = useState(false);
  const [shouldTriggerCheckboxContextChange, setShouldTriggerCheckboxContextChange] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean|undefined>(checkboxGroup.defaultChecked !== undefined ? !checkboxGroup.defaultChecked : undefined);
  const [isDisabled, setIsDisabled] = useState(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled);

  useEffect((): () => void => {
    checkboxGroup.assertIdDoesNotExist(id);
    return (): void => {
      checkboxGroup.noneCheckerCheckboxes.delete(id);
    };
  }, []);

  useEffect((): void => {
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
    id, isChecked, isDisabled, setIsChecked, setIsDisabled, initialized,
    setShouldTriggerCheckboxContextChange, checkboxGroup, shouldTriggerCheckboxContextChange,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();

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
      ref={ref}
      onChange={handleChange}
      checked={isChecked !== undefined ? isChecked : false}
      disabled={isDisabled !== undefined ? isDisabled : false}
    />
  );
});

export default NoneCheckerCheckbox;
