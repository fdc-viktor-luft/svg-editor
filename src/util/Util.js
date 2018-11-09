// @flow

const classNames = (...classes: any[]): string => classes.filter((clazz?: string) => Boolean(clazz)).join(' ');

const array = (num: number): Array<void> => Array.apply(null, ({ length: num }: any));

const nextArray = <T>(before: T[], index: number, value: T): T[] => [
    ...before.slice(0, index),
    value,
    ...before.slice(index + 1),
];

const rounded = (num: number, precision: number): number => Number(num.toFixed(precision));

export const Util = { array, rounded, classNames, nextArray };