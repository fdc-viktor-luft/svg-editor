import React from 'react';
import { EventUtil } from '../util/event-util';
import { Util } from '../util/Util';

export type SelectOption<T> = { label: string; value: T };

type SelectHandler<T> = (value: T) => void;

type SelectProps<T> = {
    required?: boolean;
    onChange?: SelectHandler<T>;
    onBlur?: SelectHandler<T>;
    value: T;
    name?: string;
    label?: string;
    className?: string;
    options: ReadonlyArray<SelectOption<T>>;
    disabled?: boolean;
    serialize?: (value: T) => string;
};

const Option: React.FC<{ label: string; value: string }> = ({ label, value }) => <option value={value}>{label}</option>;

const _identity = (v: any): unknown => v;

type GetOptionValues = <T>(options: ReadonlyArray<SelectOption<T>>, serialize?: (value: T) => string) => string[];
const getOptionValues: GetOptionValues = (options, serialize) =>
    options
        .map(o => o.value)
        .map(serialize || _identity)
        .map((v, i) => (v === undefined ? '' : typeof v === 'string' ? v : String(i)));

export const Select = <T extends any>({
    value,
    serialize,
    label,
    required,
    className,
    onChange,
    onBlur,
    options,
    disabled,
    name,
}: SelectProps<T>) => {
    const optionValues = getOptionValues(options, serialize);
    const handlerRemapped = (handler?: SelectHandler<T>) => (optionValue: string) =>
        handler && handler(options[optionValues.indexOf(optionValue)].value);
    const currentValue = options.find(option => option.value === value);
    const currentIndex = currentValue ? options.indexOf(currentValue) : 0;

    return (
        <div className={Util.classNames(className, required && 'required', !value && 'unselected')}>
            {label && <label>{label}</label>}
            <select
                className="custom-select"
                name={name}
                disabled={disabled}
                onChange={EventUtil.inputHandler(handlerRemapped(onChange))}
                onBlur={EventUtil.inputHandler(handlerRemapped(onBlur))}
                value={optionValues[currentIndex]}>
                {options.map((option, index: number) => (
                    <Option label={option.label} value={optionValues[index]} key={index} />
                ))}
            </select>
        </div>
    );
};

export const toSelectOptions = <T extends string>(
    options: Array<T>,
    placeholder: string
): SelectOption<T | undefined>[] => [
    { label: placeholder, value: undefined },
    ...options.map(c => ({ label: c, value: c })),
];
