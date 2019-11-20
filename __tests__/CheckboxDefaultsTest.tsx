import {cleanup, render} from '@testing-library/react';
import React from 'react';
import {AllCheckerCheckbox, Checkbox, CheckboxGroup, NoneCheckerCheckbox} from "../src";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

/**
 * Just checkboxes
 */
it('CheckboxGroup with default checked checkbox will be checked', () => {
    const component = render(
        <CheckboxGroup defaultChecked>
            <Checkbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    expect(checkbox3.checked).toEqual(true);
});

it('CheckboxGroup without default checked checkbox will be checked', () => {
    const component = render(
        <CheckboxGroup>
            <Checkbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
    expect(checkbox3.checked).toEqual(false);
});

it('CheckboxGroup with default disabled checkbox will be disabled', () => {
    const component = render(
        <CheckboxGroup defaultDisabled>
            <Checkbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.disabled).toEqual(true);
    expect(checkbox2.disabled).toEqual(true);
    expect(checkbox3.disabled).toEqual(true);
});

it('CheckboxGroup without default disabled checkbox will be disabled', () => {
    const component = render(
        <CheckboxGroup>
            <Checkbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.disabled).toEqual(false);
    expect(checkbox2.disabled).toEqual(false);
    expect(checkbox3.disabled).toEqual(false);
});

it('CheckboxGroup with default checked and default disabled checkbox will be checked and disabled', () => {
    const component = render(
        <CheckboxGroup defaultChecked defaultDisabled>
            <Checkbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    expect(checkbox3.checked).toEqual(true);

    expect(checkbox1.disabled).toEqual(true);
    expect(checkbox2.disabled).toEqual(true);
    expect(checkbox3.disabled).toEqual(true);
});


/**
 * Just allCheckerCheckboxes
 */
it('CheckboxGroup with default checked allCheckerCheckbox will be checked', () => {
    const component = render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <AllCheckerCheckbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    expect(checkbox3.checked).toEqual(true);
});

it('CheckboxGroup without default checked allCheckerCheckbox will be checked', () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <AllCheckerCheckbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
    expect(checkbox3.checked).toEqual(false);
});

it('CheckboxGroup with default disabled allCheckerCheckbox will be disabled', () => {
    const component = render(
        <CheckboxGroup defaultDisabled>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <AllCheckerCheckbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.disabled).toEqual(true);
    expect(checkbox2.disabled).toEqual(true);
    expect(checkbox3.disabled).toEqual(true);
});

it('CheckboxGroup without default disabled allCheckerCheckbox will be disabled', () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <AllCheckerCheckbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.disabled).toEqual(false);
    expect(checkbox2.disabled).toEqual(false);
    expect(checkbox3.disabled).toEqual(false);
});

it('CheckboxGroup with default checked and default disabled allCheckerCheckbox will be checked and disabled', () => {
    const component = render(
        <CheckboxGroup defaultChecked defaultDisabled>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <AllCheckerCheckbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    expect(checkbox3.checked).toEqual(true);

    expect(checkbox1.disabled).toEqual(true);
    expect(checkbox2.disabled).toEqual(true);
    expect(checkbox3.disabled).toEqual(true);
});


/**
 * Combination of checkboxes and allchecker checkboxes
 */
it('CheckboxGroup with default checked combination of checkboxes and allCheckerCheckbox will be checked', () => {
    const component = render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
            <AllCheckerCheckbox id={"test-checkbox-4"} data-testid="test-checkbox-4" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;
    const checkbox4 = component.getByTestId('test-checkbox-4') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    expect(checkbox3.checked).toEqual(true);
    expect(checkbox4.checked).toEqual(true);
});

it('CheckboxGroup without default checked combination of checkboxes and allCheckerCheckbox will be checked', () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
            <AllCheckerCheckbox id={"test-checkbox-4"} data-testid="test-checkbox-4" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;
    const checkbox4 = component.getByTestId('test-checkbox-4') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
    expect(checkbox3.checked).toEqual(false);
    expect(checkbox4.checked).toEqual(false);
});

it('CheckboxGroup with default disabled combination of checkboxes and allCheckerCheckbox will be disabled', () => {
    const component = render(
        <CheckboxGroup defaultDisabled>
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
            <AllCheckerCheckbox id={"test-checkbox-4"} data-testid="test-checkbox-4" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;
    const checkbox4 = component.getByTestId('test-checkbox-4') as HTMLInputElement;

    expect(checkbox1.disabled).toEqual(true);
    expect(checkbox2.disabled).toEqual(true);
    expect(checkbox3.disabled).toEqual(true);
    expect(checkbox4.disabled).toEqual(true);
});

it('CheckboxGroup without default disabled combination of checkboxes and allCheckerCheckbox will be disabled', () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox id={"test-checkbox-6"} data-testid="test-checkbox-6" />
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
            <AllCheckerCheckbox id={"test-checkbox-4"} data-testid="test-checkbox-4" />
            <NoneCheckerCheckbox id={"test-checkbox-5"} data-testid="test-checkbox-5" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;
    const checkbox4 = component.getByTestId('test-checkbox-4') as HTMLInputElement;
    const checkbox5 = component.getByTestId('test-checkbox-5') as HTMLInputElement;
    const checkbox6 = component.getByTestId('test-checkbox-6') as HTMLInputElement;

    expect(checkbox1.disabled).toEqual(false);
    expect(checkbox2.disabled).toEqual(false);
    expect(checkbox3.disabled).toEqual(false);
    expect(checkbox4.disabled).toEqual(false);
    expect(checkbox5.disabled).toEqual(false);
    expect(checkbox6.disabled).toEqual(false);
});

it('CheckboxGroup with default checked and default disabled combination of checkboxes and allCheckerCheckbox will be checked and disabled', () => {
    const component = render(
        <CheckboxGroup defaultChecked defaultDisabled>
            <NoneCheckerCheckbox id={"test-checkbox-6"} data-testid="test-checkbox-6" />
            <AllCheckerCheckbox id={"test-checkbox-1"} data-testid="test-checkbox-1" />
            <Checkbox id={"test-checkbox-2"} data-testid="test-checkbox-2" />
            <Checkbox id={"test-checkbox-3"} data-testid="test-checkbox-3" />
            <AllCheckerCheckbox id={"test-checkbox-4"} data-testid="test-checkbox-4" />
            <NoneCheckerCheckbox id={"test-checkbox-5"} data-testid="test-checkbox-5" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    const checkbox2 = component.getByTestId('test-checkbox-2') as HTMLInputElement;
    const checkbox3 = component.getByTestId('test-checkbox-3') as HTMLInputElement;
    const checkbox4 = component.getByTestId('test-checkbox-4') as HTMLInputElement;
    const checkbox5 = component.getByTestId('test-checkbox-5') as HTMLInputElement;
    const checkbox6 = component.getByTestId('test-checkbox-6') as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    expect(checkbox3.checked).toEqual(true);
    expect(checkbox4.checked).toEqual(true);
    expect(checkbox5.checked).toEqual(false);
    expect(checkbox6.checked).toEqual(false);

    expect(checkbox1.disabled).toEqual(true);
    expect(checkbox2.disabled).toEqual(true);
    expect(checkbox3.disabled).toEqual(true);
    expect(checkbox5.disabled).toEqual(true);
    expect(checkbox6.disabled).toEqual(true);
});
