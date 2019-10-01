import {cleanup, render} from '@testing-library/react';
import React from 'react';
import {AllCheckerCheckbox, Checkbox, CheckboxGroup} from "../src";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);


it('AllCheckerCheckbox will be checked when all checkboxes are checked by attribute', () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox id="all-checker-1" data-testid="all-checker-1"/>
            <Checkbox id="test-checkbox-1" data-testid="test-checkbox-1" checked/>
            <Checkbox id="test-checkbox-2" data-testid="test-checkbox-2" checked/>
            <AllCheckerCheckbox id="all-checker-2" data-testid="all-checker-2"/>
            <Checkbox id="test-checkbox-3" data-testid="test-checkbox-3" checked/>
            <AllCheckerCheckbox id="all-checker-3" data-testid="all-checker-3"/>
        </CheckboxGroup>
    );

    const allChecker1 = component.getByTestId('all-checker-1') as HTMLInputElement;
    const allChecker2 = component.getByTestId('all-checker-2') as HTMLInputElement;
    const allChecker3 = component.getByTestId('all-checker-3') as HTMLInputElement;

    expect(allChecker1.checked).toEqual(true);
    expect(allChecker2.checked).toEqual(true);
    expect(allChecker3.checked).toEqual(true);
});

it('AllCheckerCheckbox will NOT be checked when NOT all checkboxes are checked by attribute', () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox id="all-checker-1" data-testid="all-checker-1"/>
            <Checkbox id="test-checkbox-1" data-testid="test-checkbox-1" checked/>
            <Checkbox id="test-checkbox-2" data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id="all-checker-2" data-testid="all-checker-2"/>
            <Checkbox id="test-checkbox-3" data-testid="test-checkbox-3" checked/>
            <AllCheckerCheckbox id="all-checker-3" data-testid="all-checker-3"/>
        </CheckboxGroup>
    );

    const allChecker1 = component.getByTestId('all-checker-1') as HTMLInputElement;
    const allChecker2 = component.getByTestId('all-checker-2') as HTMLInputElement;
    const allChecker3 = component.getByTestId('all-checker-3') as HTMLInputElement;

    expect(allChecker1.checked).toEqual(false);
    expect(allChecker2.checked).toEqual(false);
    expect(allChecker3.checked).toEqual(false);
});

it('AllCheckerCheckbox will NOT be checked when NO checkboxes are checked by attribute', () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox id="all-checker-1" data-testid="all-checker-1"/>
            <Checkbox id="test-checkbox-1" data-testid="test-checkbox-1" />
            <Checkbox id="test-checkbox-2" data-testid="test-checkbox-2" />
            <AllCheckerCheckbox id="all-checker-2" data-testid="all-checker-2"/>
            <Checkbox id="test-checkbox-3" data-testid="test-checkbox-3" />
            <AllCheckerCheckbox id="all-checker-3" data-testid="all-checker-3"/>
        </CheckboxGroup>
    );

    const allChecker1 = component.getByTestId('all-checker-1') as HTMLInputElement;
    const allChecker2 = component.getByTestId('all-checker-2') as HTMLInputElement;
    const allChecker3 = component.getByTestId('all-checker-3') as HTMLInputElement;

    expect(allChecker1.checked).toEqual(false);
    expect(allChecker2.checked).toEqual(false);
    expect(allChecker3.checked).toEqual(false);
});
