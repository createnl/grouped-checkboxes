import React, { FC } from 'react';
interface AllCheckerCheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id: string;
    checked?: never;
}
declare const AllCheckerCheckbox: FC<AllCheckerCheckboxProps>;
export default AllCheckerCheckbox;
