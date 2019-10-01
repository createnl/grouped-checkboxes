import {cleanup, render} from '@testing-library/react';
import React from 'react';
import {AllCheckerCheckbox, Checkbox, CheckboxGroup} from "../src";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Checkbox will throw error on duplicate ids', () => {
    expect(() => render(
        <CheckboxGroup defaultChecked>
            <Checkbox id={"test-checkbox-1"} />
            <Checkbox id={"test-checkbox-1"} />
        </CheckboxGroup>
    )).toThrowError('Duplicate id test-checkbox-1 in CheckboxGroup');
});

it('AllCheckerCheckbox will throw error on duplicate ids', () => {
    expect(() => render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox id={"test-checkbox-1"} />
            <AllCheckerCheckbox id={"test-checkbox-1"} />
        </CheckboxGroup>
    )).toThrowError('Duplicate id test-checkbox-1 in CheckboxGroup');
});

it('AllCheckerCheckbox and Checkbox will throw error on duplicate ids', () => {
    expect(() => render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox id={"test-checkbox-1"} />
            <Checkbox id={"test-checkbox-1"} />
        </CheckboxGroup>
    )).toThrowError('Duplicate id test-checkbox-1 in CheckboxGroup');
});

it('Checkbox and AllCheckerCheckbox will throw error on duplicate ids', () => {
    expect(() => render(
        <CheckboxGroup defaultChecked>
            <Checkbox id={"test-checkbox-1"} />
            <AllCheckerCheckbox id={"test-checkbox-1"} />
        </CheckboxGroup>
    )).toThrowError('Duplicate id test-checkbox-1 in CheckboxGroup');
});

it('Dynamically change id of allCheckerCheckbox will throw error', () => {
    const { rerender } = render(
        <CheckboxGroup defaultChecked>
            <Checkbox id={"test-checkbox-1"} />
            <AllCheckerCheckbox id={"test-checkbox-2"} />
        </CheckboxGroup>
    );

    expect(() => rerender(
        <CheckboxGroup defaultChecked>
            <Checkbox id={"test-checkbox-1"} />
            <AllCheckerCheckbox id={"test-checkbox-1"} />
        </CheckboxGroup>
    )).toThrowError('Duplicate id test-checkbox-1 in CheckboxGroup');
});

it('Dynamically change id of checkbox will throw error', () => {
    const { rerender } = render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox id={"test-checkbox-2"} />
            <Checkbox id={"test-checkbox-1"} />
        </CheckboxGroup>
    );

    expect(() => rerender(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox id={"test-checkbox-2"} />
            <Checkbox id={"test-checkbox-2"} />
        </CheckboxGroup>
    )).toThrowError('Duplicate id test-checkbox-2 in CheckboxGroup');
});

