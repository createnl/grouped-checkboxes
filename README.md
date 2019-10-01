# Grouped Checkboxes
[![codecov](https://codecov.io/gh/createnl/grouped-checkboxes/branch/master/graph/badge.svg)](https://codecov.io/gh/createnl/grouped-checkboxes)
[![Build Status](https://travis-ci.org/createnl/grouped-checkboxes.svg?branch=master)](https://travis-ci.org/createnl/grouped-checkboxes)

An easy to use React Component to create a checkbox group with a checkbox to check all checkboxes.

## Installation
```
npm install --save createnl/grouped-checkboxes
```
```
yarn add createnl/grouped-checkboxes
```

## Example
``` jsx harmony
import React from "react";
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from 'grouped-checkboxes';

const MyGroupedCheckboxes = (props) => {
    const onCheckboxChange = (checkboxes) => {
        console.log(checkboxes);
    }    

    return (
        <CheckboxGroup onChange={onCheckboxChange}>
          <AllCheckerCheckbox id="check-all" />
          <Checkbox id="first-option" />
          <Checkbox id="second-option" />
          <Checkbox id="third-option" />
        </CheckboxGroup>
    );
};
```
Note that:
- `Checkbox` and `AllCheckerCheckbox` must be inside a `CheckboxGroup`
- All checkboxes and allCheckerCheckboxes must have an unique id

## Features
- Multiple `AllCheckerCheckboxes` inside a group
- `onChange` callback on group
- Possibility to nest checkboxes in your own components
- Possibility to check or disable by default
- You can do anything with a `Checkbox` you can do to an `input` component
- Fully Typed

## Advanced examples

### Checking checkboxes
```jsx harmony
<CheckboxGroup defaultChecked> // Set defaultChecked to check all by default
  <AllCheckerCheckbox id="check-all" checked/> // Error: You cant contol allCheckerCheckboxes individually (will check automatically if necessary)
  <Checkbox id="first-option" checked/> // Check individual checkboxes
</CheckboxGroup>
```

### Disabling checkboxes
```jsx harmony
<CheckboxGroup defaultDisabled> // Set defaultDisabled to disable all by default
  <AllCheckerCheckbox id="check-all" disabled/> // Disable allCheckerCheckbox, will still check if all checkboxes are checked
  <Checkbox id="first-option" disabled/> // Disable individual checkboxes
</CheckboxGroup>
```

### Real life example
``` jsx harmony
import React from "react";
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from 'grouped-checkboxes';

const PermissionsFrom = (props) => {
    const onCheckboxChange = (checkboxes) => {
        console.log(checkboxes);
    }    

    return (
        <CheckboxGroup onChange={console.log}>
          <label>
            <Checkbox id="tos" />
            Terms and Conditions
          </label>
          <label>
            <Checkbox id="privacy-policy" />
            Privacy Policy
          </label>
          <label>
            <Checkbox id="advertisements" />
            Advertisements
          </label>
          <label>
            <AllCheckerCheckbox id="check-all" />
            Agree to all
          </label>
        </CheckboxGroup>
    );
};
```

The value of an onChange parameter looks like:
```json
[
    {
        "checked": true,
        "disabled": false,
        "id": "tos",
    },
    {
        "checked": true,
        "disabled": false,
        "id": "privacy-policy"
    }, 
    {
        "checked": true,
        "disabled": false,
        "id": "advertisements"
    }
]
```
All given props will be accessible.
