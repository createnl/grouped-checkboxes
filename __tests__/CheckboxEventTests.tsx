import {cleanup, fireEvent, render} from '@testing-library/react';
import React from 'react';
import {Checkbox, CheckboxGroup} from "../src";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Unchecked checkbox will check on click', () => {
    const component = render(
        <CheckboxGroup>
            <Checkbox data-testid="test-checkbox" />
        </CheckboxGroup>
    );

    const checkbox = component.getByTestId('test-checkbox') as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
});

it('Checked checkbox will uncheck on click', () => {
    const component = render(
        <CheckboxGroup>
            <Checkbox data-testid="test-checkbox" checked />
        </CheckboxGroup>
    );

    const checkbox = component.getByTestId('test-checkbox') as HTMLInputElement;

    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
});

it('Click on checkbox will trigger onChange on checkboxGroup', (done) => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup onChange={testOnChange}>
            <Checkbox data-testid="test-checkbox-1" />
            <Checkbox data-testid="test-checkbox-2" />
            <Checkbox data-testid="test-checkbox-3" />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox-1') as HTMLInputElement;
    fireEvent.click(checkbox1);

    setTimeout(() => {
        expect(testOnChange.mock.calls.length).toBe(1);
        expect(testOnChange.mock.calls[0][0]).toStrictEqual([{"data-testid":"test-checkbox-1","checked":true,"disabled":false},{"data-testid":"test-checkbox-2","checked":false,"disabled":false},{"data-testid":"test-checkbox-3","checked":false,"disabled":false}]);
        done();
    }, 251);
});

it('Click will trigger onChange on checkbox', () => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup>
            <Checkbox data-testid="test-checkbox" onChange={testOnChange} />
        </CheckboxGroup>
    );

    const checkbox1 = component.getByTestId('test-checkbox') as HTMLInputElement;

    fireEvent.click(checkbox1);
    expect(testOnChange.mock.calls.length).toBe(1);
});
