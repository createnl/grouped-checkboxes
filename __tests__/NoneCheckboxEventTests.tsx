import {cleanup, fireEvent, render} from "@testing-library/react";
import React from "react";
import {Checkbox, CheckboxGroup, NoneCheckerCheckbox} from "../src";
import CheckboxGroupContext from "../src/CheckboxGroupContext";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("Unchecked noneCheckerCheckbox will check on click", () => {
    const component = render(
        <CheckboxGroup>
            <Checkbox checked />
            <NoneCheckerCheckbox data-testid="test-checkbox" />
        </CheckboxGroup>,
    );

    const checkbox = component.getByTestId("test-checkbox") as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
});

it("Checked noneCheckerCheckbox will NOT uncheck on click", () => {
    const component = render(
        <CheckboxGroup>
            <Checkbox />
            <NoneCheckerCheckbox data-testid="test-checkbox" />
        </CheckboxGroup>,
    );

    const checkbox = component.getByTestId("test-checkbox") as HTMLInputElement;

    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
});

it("All checkboxes will uncheck on noneCheckboxesChecker click", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox" />
            <Checkbox data-testid="test-checkbox-1" checked/>
            <Checkbox data-testid="test-checkbox-2" checked/>
        </CheckboxGroup>,
    );

    const noneCheckerCheckbox = component.getByTestId("none-checker-checkbox") as HTMLInputElement;
    const checkbox1 = component.getByTestId("test-checkbox-1") as HTMLInputElement;
    const checkbox2 = component.getByTestId("test-checkbox-2") as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    fireEvent.click(noneCheckerCheckbox);
    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
});

it("All checkboxes will stay unchecked on noneCheckboxesChecker click", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox" />
            <Checkbox data-testid="test-checkbox-1"/>
            <Checkbox data-testid="test-checkbox-2"/>
        </CheckboxGroup>,
    );

    const noneCheckerCheckbox = component.getByTestId("none-checker-checkbox") as HTMLInputElement;
    const checkbox1 = component.getByTestId("test-checkbox-1") as HTMLInputElement;
    const checkbox2 = component.getByTestId("test-checkbox-2") as HTMLInputElement;

    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
    fireEvent.click(noneCheckerCheckbox);
    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
});

it("All noneCheckerCheckboxes will uncheck when not all checkboxes are unchecked", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox-1" />
            <Checkbox data-testid="test-checkbox"/>
            <Checkbox/>
            <Checkbox/>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox-2" />
        </CheckboxGroup>,
    );

    const noneCheckerCheckbox1 = component.getByTestId("none-checker-checkbox-1") as HTMLInputElement;
    const noneCheckerCheckbox2 = component.getByTestId("none-checker-checkbox-2") as HTMLInputElement;
    const checkbox = component.getByTestId("test-checkbox") as HTMLInputElement;

    expect(noneCheckerCheckbox1.checked).toEqual(true);
    expect(noneCheckerCheckbox2.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(noneCheckerCheckbox1.checked).toEqual(false);
    expect(noneCheckerCheckbox2.checked).toEqual(false);
});

it("All noneCheckerCheckboxes will check when all checkboxes are unchecked", () => {
    const component = render(
        <CheckboxGroup>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox-1" />
            <Checkbox data-testid="test-checkbox-1" checked/>
            <Checkbox data-testid="test-checkbox-2" checked/>
            <Checkbox data-testid="test-checkbox-3" checked/>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox-2" />
        </CheckboxGroup>,
    );

    const noneCheckerCheckbox1 = component.getByTestId("none-checker-checkbox-1") as HTMLInputElement;
    const noneCheckerCheckbox2 = component.getByTestId("none-checker-checkbox-2") as HTMLInputElement;
    const checkbox1 = component.getByTestId("test-checkbox-1") as HTMLInputElement;
    const checkbox2 = component.getByTestId("test-checkbox-2") as HTMLInputElement;
    const checkbox3 = component.getByTestId("test-checkbox-3") as HTMLInputElement;

    expect(noneCheckerCheckbox1.checked).toEqual(false);
    expect(noneCheckerCheckbox2.checked).toEqual(false);
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    fireEvent.click(checkbox3);
    expect(noneCheckerCheckbox1.checked).toEqual(true);
    expect(noneCheckerCheckbox2.checked).toEqual(true);
});

it("Click on noneCheckerCheckbox will trigger onChange on checkboxGroup", () => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup onChange={testOnChange}>
            <NoneCheckerCheckbox data-testid="none-checker-checkbox-1" />
            <Checkbox data-testid="test-checkbox-1" checked/>
            <Checkbox data-testid="test-checkbox-2" />
            <Checkbox data-testid="test-checkbox-3" />
            <NoneCheckerCheckbox data-testid="none-checker-checkbox-2" />
        </CheckboxGroup>,
    );
    setTimeout(() => {
        const noneCheckerCheckbox1 = component.getByTestId("none-checker-checkbox-1") as HTMLInputElement;
        fireEvent.click(noneCheckerCheckbox1);
        expect(testOnChange.mock.calls.length).toBe(1);
    }, 251);
});

it("Click will trigger onChange on noneCheckerCheckbox", () => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup>
            <Checkbox />
            <NoneCheckerCheckbox data-testid="test-checkbox" onChange={testOnChange} />
        </CheckboxGroup>,
    );

    const checkbox1 = component.getByTestId("test-checkbox") as HTMLInputElement;

    fireEvent.click(checkbox1);
    expect(testOnChange.mock.calls.length).toBe(1);
});

it("onNoneCheckerCheckboxChange with unknown id will do nothing", (done) => {
    const testOnChange = jest.fn();
    const mockedNoneCheckerCheckboxes = new Map();

    const mock = () => (
        <CheckboxGroup onChange={testOnChange}>
            <CheckboxGroupContext.Consumer>
                {(props) => {
                    return (
                        <CheckboxGroupContext.Provider value={{
                            ...props,
                            noneCheckerCheckboxes: mockedNoneCheckerCheckboxes,
                        }}>
                            <NoneCheckerCheckbox data-testid="none-checker-checkbox-1" />
                        </CheckboxGroupContext.Provider>
                    );
                }}
            </CheckboxGroupContext.Consumer>
        </CheckboxGroup>
    );

    const component = render(mock());
    const checkbox1 = component.getByTestId("none-checker-checkbox-1") as HTMLInputElement;
    mockedNoneCheckerCheckboxes.clear();
    expect(mockedNoneCheckerCheckboxes.size).toBe(0);
    fireEvent.change(checkbox1);

    setTimeout(() => {
        expect(testOnChange.mock.calls.length).toBe(0);
        done();
    }, 251);
});
