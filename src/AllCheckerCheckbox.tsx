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

type AllCheckerCheckboxProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & RefAttributes<HTMLInputElement>, 'checked'>

const AllCheckerCheckbox: ForwardRefExoticComponent<AllCheckerCheckboxProps> = forwardRef((props, ref): ReactElement => {
    const { disabled, onChange } = props;

    const [id] = useState(uuid());
    const checkboxGroup = useContext(CheckboxGroupContext);

    const [initialized, setInitialized] = useState(false);
    const [shouldTriggerCheckboxContextChange, setShouldTriggerCheckboxContextChange] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean | undefined>(checkboxGroup.defaultChecked);
    const [isDisabled, setIsDisabled] = useState(disabled !== undefined ? disabled : checkboxGroup.defaultDisabled);

    useEffect((): () => void => {
        checkboxGroup.assertIdDoesNotExist(id);

        return (): void => {
            checkboxGroup.allCheckerCheckboxes.delete(id);
        };
    }, []);

    useEffect((): void => {
        checkboxGroup.allCheckerCheckboxes.set(id, {
            isChecked,
            isDisabled,
            props,
            setIsChecked,
            setIsDisabled,
        });

        if (shouldTriggerCheckboxContextChange) {
            checkboxGroup.onAllCheckerCheckboxChange(id, initialized);
            setShouldTriggerCheckboxContextChange(false);
        }

        if (!initialized) {
            setInitialized(true);
        }
    }, [
        id,
        isChecked,
        isDisabled,
        initialized,
        checkboxGroup,
        shouldTriggerCheckboxContextChange,
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

export default AllCheckerCheckbox;
