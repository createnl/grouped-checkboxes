# Grouped Checkboxes
[![codecov](https://codecov.io/gh/createnl/grouped-checkboxes/branch/master/graph/badge.svg)](https://codecov.io/gh/createnl/grouped-checkboxes)
[![Build Status](https://travis-ci.org/createnl/grouped-checkboxes.svg?branch=master)](https://travis-ci.org/createnl/grouped-checkboxes)
[![GitHub](https://img.shields.io/github/license/createnl/grouped-checkboxes)](https://github.com/createnl/grouped-checkboxes/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/@createnl/grouped-checkboxes)](https://www.npmjs.com/package/@createnl/grouped-checkboxes)
[![React](https://img.shields.io/badge/React-^16.8.0-brightgreen)](https://github.com/facebook/react)

An easy to use React Component to create a checkbox group with a checkbox to check all checkboxes and a checkbox to check none.

## Installation
```
npm install --save @createnl/grouped-checkboxes
```
```
yarn add @createnl/grouped-checkboxes
```

## Example
[![See examples](example.gif)](https://v5sww.csb.app/)

Live examples: https://v5sww.csb.app/

Codesandbox: https://codesandbox.io/s/grouped-checkboxes-v5sww

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
- Multiple `AllCheckerCheckboxes` and `NoneCheckerCheckboxes` inside a group
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

### Real life example (with check all)
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
        "id": "tos"
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

### Real life example (with none-checker)
If you need a checkbox that will check when nothing is checked you can use the NoneCheckerCheckbox.
This checkbox can be clicked to uncheck everything else, but can't be unchecked to check everything else. 

``` jsx harmony
import React from "react";
import { NoneCheckerCheckbox, Checkbox, CheckboxGroup } from 'grouped-checkboxes';

const LunchDeclaration = (props) => {
    const onCheckboxChange = (checkboxes) => {
        console.log(checkboxes);
    }    

    return (
        <CheckboxGroup onChange={console.log}>
          <h1>What did you eat for lunch?</h1>
          <label>
            <Checkbox id="pizza" />
            Pizza
          </label>
          <label>
            <Checkbox id="burger" />
            Burger
          </label>
          <label>
            <Checkbox id="fries" />
            Fries
          </label>
          <label>
            <NoneCheckerCheckbox id="nothing" />
            Nothing
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
        "id": "pizza"
    },
    {
        "checked": true,
        "disabled": false,
        "id": "burger"
    }, 
    {
        "checked": true,
        "disabled": false,
        "id": "fries"
    }
]
```
Note that the value of the NoneCheckerCheckbox will not be passed.
