/**
 * This file is part of svg-editor which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React from 'react';
import { DisplayError, Label } from './common';
import { EventUtil } from '../util/event-util';

export type SelectOption<T> = { label: string, value: T };

type SelectHandler<T> = T => void;

type SelectProps<T> = {
    value: T,
    label?: string,
    error?: string,
    required?: boolean,
    className?: string,
    onChange: SelectHandler<T>,
    onBlur?: SelectHandler<T>,
    options: SelectOption<T>[],
    disabled?: boolean,
};

const Option = ({ label, value }: { label: string, value: string }) => <option value={value}>{label}</option>;

const getOptionValues = <T>(options: SelectOption<T>[]): string[] =>
    options.map((o, i) => (o === undefined ? '' : typeof o === 'string' ? o : String(i)));

export const Select = <T>({
    value,
    label,
    error,
    required,
    className,
    onChange,
    onBlur,
    options,
    disabled,
}: SelectProps<T>) => {
    const optionValues = getOptionValues(options);
    const handlerRemapped = (handler?: SelectHandler<T>) => (optionValue: string) =>
        handler && handler(options[optionValues.indexOf(optionValue)].value);
    const currentIndex = options.indexOf(options.find(option => option.value === value));
    return (
        <div className={className}>
            {label && <Label {...{ label, required }} />}
            <select
                disabled={disabled}
                onChange={EventUtil.inputHandler(handlerRemapped(onChange))}
                onBlur={EventUtil.inputHandler(handlerRemapped(onBlur))}
                value={currentIndex === -1 ? '' : String(currentIndex)}>
                {options.map((option: SelectOption<T>, index: number) => (
                    <Option label={option.label} value={optionValues[index]} key={index} />
                ))}
            </select>
            {error && <DisplayError error={error} />}
        </div>
    );
};

export const toSelectOptions = <T: string>(options: Array<T>, placeholder: string): SelectOption<T | void>[] => [
    { label: placeholder, value: undefined },
    ...options.map(c => ({ label: c, value: c })),
];
