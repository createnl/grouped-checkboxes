import {cleanup, fireEvent, render} from "@testing-library/react";
import React from "react";
import {AllCheckerCheckbox, Checkbox, CheckboxGroup} from "../src";
import CheckboxGroupContext from "../src/CheckboxGroupContext";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("Unchecked allCheckerCheckbox will check on click", () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="test-checkbox" />
        </CheckboxGroup>,
    );

    const checkbox = component.getByTestId("test-checkbox") as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
});

it("Checked allCheckerCheckbox will uncheck on click", () => {
    const component = render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox data-testid="test-checkbox" />
        </CheckboxGroup>,
    );

    const checkbox = component.getByTestId("test-checkbox") as HTMLInputElement;

    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
});

it("All checkboxes will check on allCheckboxesChecker click", () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="all-checker-checkbox" />
            <Checkbox data-testid="test-checkbox-1" />
            <Checkbox data-testid="test-checkbox-2" />
        </CheckboxGroup>,
    );

    const allCheckerCheckbox = component.getByTestId("all-checker-checkbox") as HTMLInputElement;
    const checkbox1 = component.getByTestId("test-checkbox-1") as HTMLInputElement;
    const checkbox2 = component.getByTestId("test-checkbox-2") as HTMLInputElement;

    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
    fireEvent.click(allCheckerCheckbox);
    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
});

it("All checkboxes will uncheck on allCheckboxesChecker click", () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="all-checker-checkbox" />
            <Checkbox data-testid="test-checkbox-1" checked/>
            <Checkbox data-testid="test-checkbox-2" checked/>
        </CheckboxGroup>,
    );

    const allCheckerCheckbox = component.getByTestId("all-checker-checkbox") as HTMLInputElement;
    const checkbox1 = component.getByTestId("test-checkbox-1") as HTMLInputElement;
    const checkbox2 = component.getByTestId("test-checkbox-2") as HTMLInputElement;

    expect(checkbox1.checked).toEqual(true);
    expect(checkbox2.checked).toEqual(true);
    fireEvent.click(allCheckerCheckbox);
    expect(checkbox1.checked).toEqual(false);
    expect(checkbox2.checked).toEqual(false);
});

it("All allCheckerCheckboxes will uncheck when not all checkboxes are checked", () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="all-checker-checkbox-1" />
            <Checkbox data-testid="test-checkbox" checked/>
            <Checkbox checked/>
            <Checkbox checked/>
            <AllCheckerCheckbox data-testid="all-checker-checkbox-2" />
        </CheckboxGroup>,
    );

    const allCheckerCheckbox1 = component.getByTestId("all-checker-checkbox-1") as HTMLInputElement;
    const allCheckerCheckbox2 = component.getByTestId("all-checker-checkbox-2") as HTMLInputElement;
    const checkbox = component.getByTestId("test-checkbox") as HTMLInputElement;

    expect(allCheckerCheckbox1.checked).toEqual(true);
    expect(allCheckerCheckbox2.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(allCheckerCheckbox1.checked).toEqual(false);
    expect(allCheckerCheckbox2.checked).toEqual(false);
});

it("All allCheckerCheckboxes will check when all checkboxes are checked", () => {
    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="all-checker-checkbox-1" />
            <Checkbox data-testid="test-checkbox-1" />
            <Checkbox data-testid="test-checkbox-2" />
            <Checkbox data-testid="test-checkbox-3" />
            <AllCheckerCheckbox data-testid="all-checker-checkbox-2" />
        </CheckboxGroup>,
    );

    const allCheckerCheckbox1 = component.getByTestId("all-checker-checkbox-1") as HTMLInputElement;
    const allCheckerCheckbox2 = component.getByTestId("all-checker-checkbox-2") as HTMLInputElement;
    const checkbox1 = component.getByTestId("test-checkbox-1") as HTMLInputElement;
    const checkbox2 = component.getByTestId("test-checkbox-2") as HTMLInputElement;
    const checkbox3 = component.getByTestId("test-checkbox-3") as HTMLInputElement;

    expect(allCheckerCheckbox1.checked).toEqual(false);
    expect(allCheckerCheckbox2.checked).toEqual(false);
    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);
    fireEvent.click(checkbox3);
    expect(allCheckerCheckbox1.checked).toEqual(true);
    expect(allCheckerCheckbox2.checked).toEqual(true);
});

it("Click on allCheckerCheckbox will trigger onChange on checkboxGroup", () => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup onChange={testOnChange}>
            <AllCheckerCheckbox data-testid="all-checker-checkbox-1" />
            <Checkbox data-testid="test-checkbox-1" />
            <Checkbox data-testid="test-checkbox-2" />
            <Checkbox data-testid="test-checkbox-3" />
            <AllCheckerCheckbox data-testid="all-checker-checkbox-2" />
        </CheckboxGroup>,
    );
    setTimeout(() => {
        const allCheckerCheckbox1 = component.getByTestId("all-checker-checkbox-1") as HTMLInputElement;
        fireEvent.click(allCheckerCheckbox1);
        expect(testOnChange.mock.calls.length).toBe(1);
    }, 251);
});

it("Click will trigger onChange on allCheckerCheckbox", () => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="test-checkbox" onChange={testOnChange} />
        </CheckboxGroup>,
    );

    const checkbox1 = component.getByTestId("test-checkbox") as HTMLInputElement;

    fireEvent.click(checkbox1);
    expect(testOnChange.mock.calls.length).toBe(1);
});

it("Click will trigger onChange on allCheckerCheckbox", () => {
    const testOnChange = jest.fn();

    const component = render(
        <CheckboxGroup>
            <AllCheckerCheckbox data-testid="test-checkbox" onChange={testOnChange} />
        </CheckboxGroup>,
    );

    const checkbox1 = component.getByTestId("test-checkbox") as HTMLInputElement;

    fireEvent.click(checkbox1);
    expect(testOnChange.mock.calls.length).toBe(1);
});

it("onAllCheckerCheckboxChange with unknown id will do nothing", (done) => {
    const testOnChange = jest.fn();
    const mockedAllCheckerCheckboxes = new Map();

    const mock = () => (
        <CheckboxGroup onChange={testOnChange}>
            <CheckboxGroupContext.Consumer>
                {(props) => {
                    return (
                        <CheckboxGroupContext.Provider value={{
                            ...props,
                            allCheckerCheckboxes: mockedAllCheckerCheckboxes,
                        }}>
                            <AllCheckerCheckbox data-testid="all-checker-checkbox-1" />
                        </CheckboxGroupContext.Provider>
                    );
                }}
            </CheckboxGroupContext.Consumer>
        </CheckboxGroup>
    );

    const component = render(mock());
    const checkbox1 = component.getByTestId("all-checker-checkbox-1") as HTMLInputElement;
    mockedAllCheckerCheckboxes.clear();
    expect(mockedAllCheckerCheckboxes.size).toBe(0);
    fireEvent.change(checkbox1);

    setTimeout(() => {
        expect(testOnChange.mock.calls.length).toBe(0);
        done();
    }, 251);
});
