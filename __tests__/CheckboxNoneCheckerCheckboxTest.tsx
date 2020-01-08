import {cleanup, render} from "@testing-library/react";
import React from "react";
import {Checkbox, CheckboxGroup, NoneCheckerCheckbox} from "../src";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("NoneCheckerCheckbox will be checked when all checkboxes are not checked by attribute", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-1"/>
            <Checkbox data-testid="test-checkbox-1"/>
            <Checkbox data-testid="test-checkbox-2"/>
            <NoneCheckerCheckbox data-testid="none-checker-2"/>
            <Checkbox data-testid="test-checkbox-3"/>
            <NoneCheckerCheckbox data-testid="none-checker-3"/>
        </CheckboxGroup>,
    );

    const allChecker1 = component.getByTestId("none-checker-1") as HTMLInputElement;
    const allChecker2 = component.getByTestId("none-checker-2") as HTMLInputElement;
    const allChecker3 = component.getByTestId("none-checker-3") as HTMLInputElement;

    expect(allChecker1.checked).toEqual(true);
    expect(allChecker2.checked).toEqual(true);
    expect(allChecker3.checked).toEqual(true);
});

it("NoneCheckerCheckbox will NOT be checked when SOME checkboxes are checked by attribute", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-1"/>
            <Checkbox data-testid="test-checkbox-1" checked/>
            <Checkbox data-testid="test-checkbox-2" />
            <NoneCheckerCheckbox data-testid="none-checker-2"/>
            <Checkbox data-testid="test-checkbox-3" checked/>
            <NoneCheckerCheckbox data-testid="none-checker-3"/>
        </CheckboxGroup>,
    );

    const allChecker1 = component.getByTestId("none-checker-1") as HTMLInputElement;
    const allChecker2 = component.getByTestId("none-checker-2") as HTMLInputElement;
    const allChecker3 = component.getByTestId("none-checker-3") as HTMLInputElement;

    expect(allChecker1.checked).toEqual(false);
    expect(allChecker2.checked).toEqual(false);
    expect(allChecker3.checked).toEqual(false);
});

it("NoneCheckerCheckbox will NOT be checked when ALL checkboxes are checked by attribute", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-1"/>
            <Checkbox data-testid="test-checkbox-1" checked/>
            <Checkbox data-testid="test-checkbox-2" checked/>
            <NoneCheckerCheckbox data-testid="none-checker-2"/>
            <Checkbox data-testid="test-checkbox-3" checked/>
            <NoneCheckerCheckbox data-testid="none-checker-3"/>
        </CheckboxGroup>,
    );

    const allChecker1 = component.getByTestId("none-checker-1") as HTMLInputElement;
    const allChecker2 = component.getByTestId("none-checker-2") as HTMLInputElement;
    const allChecker3 = component.getByTestId("none-checker-3") as HTMLInputElement;

    expect(allChecker1.checked).toEqual(false);
    expect(allChecker2.checked).toEqual(false);
    expect(allChecker3.checked).toEqual(false);
});

it("NoneCheckerCheckbox will NOT be checked when checkbox group is defaultChecked", () => {
    const component = render(
        <CheckboxGroup defaultChecked>
            <NoneCheckerCheckbox data-testid="none-checker-1"/>
            <Checkbox data-testid="test-checkbox-1"/>
            <Checkbox data-testid="test-checkbox-2"/>
            <NoneCheckerCheckbox data-testid="none-checker-2"/>
            <Checkbox data-testid="test-checkbox-3"/>
            <NoneCheckerCheckbox data-testid="none-checker-3"/>
        </CheckboxGroup>,
    );

    const allChecker1 = component.getByTestId("none-checker-1") as HTMLInputElement;
    const allChecker2 = component.getByTestId("none-checker-2") as HTMLInputElement;
    const allChecker3 = component.getByTestId("none-checker-3") as HTMLInputElement;

    expect(allChecker1.checked).toEqual(false);
    expect(allChecker2.checked).toEqual(false);
    expect(allChecker3.checked).toEqual(false);
});
