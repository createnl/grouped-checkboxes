import {cleanup, render} from "@testing-library/react";
import React from "react";
import {AllCheckerCheckbox, Checkbox, CheckboxGroup, NoneCheckerCheckbox} from "../src";
import uuid from "../src/uuid";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
jest.mock('../src/uuid');

it("Checkbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <Checkbox />
            <Checkbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("AllCheckerCheckbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox />
            <AllCheckerCheckbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("NoneCheckerCheckbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <NoneCheckerCheckbox />
            <AllCheckerCheckbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("AllCheckerCheckbox and Checkbox will throw error on duplicate ids", () => {
    expect(() => render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox />
            <Checkbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("Checkbox and AllCheckerCheckbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <Checkbox />
            <AllCheckerCheckbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("AllCheckerCheckbox and NoneCheckerCheckbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockImplementation(() => 'test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <AllCheckerCheckbox />
            <NoneCheckerCheckbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("NoneCheckerCheckbox and AllCheckerCheckbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <NoneCheckerCheckbox />
            <AllCheckerCheckbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("NoneCheckerCheckbox and Checkbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <NoneCheckerCheckbox />
            <Checkbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});

it("Checkbox and NoneCheckerCheckbox will throw error on duplicate ids", () => {
    // @ts-ignore
    uuid.mockImplementation(() => jest.fn().mockReturnValue('test-checkbox-1'));

    expect(() => render(
        <CheckboxGroup defaultChecked>
            <Checkbox />
            <NoneCheckerCheckbox />
        </CheckboxGroup>,
    )).toThrowError("Duplicate id test-checkbox-1 in CheckboxGroup");
});
