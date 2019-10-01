import React, { FC } from 'react';
interface CheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id: string;
}
declare const Checkbox: FC<CheckboxProps>;
export default Checkbox;
