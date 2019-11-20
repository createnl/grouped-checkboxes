import React, { FC } from 'react';
interface NoneCheckerCheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id: string;
    checked?: never;
}
declare const NoneCheckerCheckbox: FC<NoneCheckerCheckboxProps>;
export default NoneCheckerCheckbox;
