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
import uuid from './uuid';

type CheckboxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & RefAttributes<HTMLInputElement>;

const Checkbox: ForwardRefExoticComponent<CheckboxProps> = forwardRef((props, ref): ReactElement => {
    const { checked, disabled, onChange } = props;

    const [id] = useState(uuid());
    const checkboxGroup = useContext(CheckboxGroupContext);

    const [shouldTriggerCheckboxContextChange, setShouldTriggerCheckboxContextChange] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean | undefined>(checked !== undefined ? checked : checkboxGroup.defaultChecked);
    const [isDisabled, setIsDisabled] = useState<boolean | undefined>(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled);

    useEffect((): () => void => {
        checkboxGroup.assertIdDoesNotExist(id);

        return (): void => {
            checkboxGroup.checkboxes.delete(id);
            checkboxGroup.onCheckboxChange();
        };
    }, []);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    useEffect((): void => {
        checkboxGroup.checkboxes.set(id, {
            isChecked,
            isDisabled,
            props,
            setIsChecked,
            setIsDisabled,
        });

        if (shouldTriggerCheckboxContextChange) {
            checkboxGroup.onCheckboxChange();
            setShouldTriggerCheckboxContextChange(false);
        }
    }, [
        id,
        isChecked,
        isDisabled,
        checkboxGroup,
        shouldTriggerCheckboxContextChange,
    ]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

export default Checkbox;
