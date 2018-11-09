/**
 * This file is part of svg-editor which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import { Util } from '../util/Util';

export type Point = { x: number, y: number };

/**
 * Listing of all available supported commands:
 *
 * M x y (or m dx dy)
 * L x y (or l dx dy)
 * H x (or h dx)
 * V y (or v dy)
 * Z (or z)
 * C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
 * S x2 y2, x y (or s dx2 dy2, dx dy)
 * Q x1 y1, x y (or q dx1 dy1, dx dy)
 * T x y (or t dx dy)
 * A rx ry x-axis-rotation large-arc-flag sweep-flag x y
 * a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
 *
 * For more examples and information, see: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
 */
export type CommandLetter =
    | 'M'
    | 'm'
    | 'Q'
    | 'q'
    | 'L'
    | 'l'
    | 'Z'
    | 'z'
    | 'A'
    | 'a'
    | 'C'
    | 'c'
    | 'T'
    | 't'
    | 'S'
    | 's'
    | 'V'
    | 'v'
    | 'H'
    | 'h';
export type Command = { letter: CommandLetter, points: Point[], values: number[] };

const parsePoints = (numbers: number[]) => (_, index: number) => ({ x: numbers[2 * index], y: numbers[2 * index + 1] });
const parseSpecifiedCommand = (command: string, points: number, values: number) => {
    const letter: CommandLetter = (command[0]: any);
    const numbers = command
        .substr(1)
        .replace(/[-]+/g, ' -')
        .replace(/[, ]+/g, ',')
        .split(',')
        .filter(Boolean)
        .map(Number);

    return { letter, points: Util.array(points).map(parsePoints(numbers)), values: numbers.slice(0, values) };
};

const requiredPointsForCommand = (command: CommandLetter): number => {
    if (/[mlt]/i.test(command)) return 1;
    if (/[qs]/i.test(command)) return 2;
    if (/c/i.test(command)) return 3;
    return 0;
};

const requiredValuesForCommand = (command: CommandLetter): number => {
    if (/[vh]/i.test(command)) return 1;
    if (/a/i.test(command)) return 7;
    return 0;
};

const parseCommand = (command: string): Command | void => {
    const letter: CommandLetter = (command[0]: any);
    return parseSpecifiedCommand(command, requiredPointsForCommand(letter), requiredValuesForCommand(letter));
};

const applySpaceToPositive = (num: number): string => (num < 0 ? String(num) : ' ' + num);

const pointsToString = (points: Point[]): string =>
    points
        .map(({ x, y }) => `${applySpaceToPositive(x)}${applySpaceToPositive(y)}`)
        .join('')
        .trim();
const valuesToString = (values: number[]): string =>
    values
        .map(v => `${applySpaceToPositive(v)}`)
        .join('')
        .trim();

const commandToString = (command: Command): string =>
    `${command.letter}${pointsToString(command.points)}${valuesToString(command.values)}`;

const commandsToString = (commands: Command[]): string => commands.map(commandToString).join('');

const parsePath = (path: string) => (path.match(/([a-zA-Z][ \-.0-9]*)/g) || []).map(parseCommand).filter(Boolean);

const pointTransition = (x: number, y: number) => (point: Point): Point => ({ x: point.x + x, y: point.y + y });

const commandTransition = (command: Command, x: number, y: number): Command => {
    const letter = command.letter;
    switch (letter) {
        case 'M':
        case 'L':
        case 'Q':
            return { ...command, points: command.points.map(pointTransition(x, y)) };
        default:
            return command;
    }
};

const transition = (path: string, x: number, y: number): string =>
    commandsToString(parsePath(path).map(c => commandTransition(c, x, y)));

const pointScale = (scaling: number, precision: number) => (point: Point): Point => ({
    x: Util.rounded(point.x * scaling, precision),
    y: Util.rounded(point.y * scaling, precision),
});

const commandScale = (scaling: number, precision: number) => (command: Command): Command => {
    const letter = command.letter;
    switch (letter) {
        case 'M':
        case 'm':
        case 'L':
        case 'l':
        case 'Q':
        case 'q':
            return { ...command, points: command.points.map(pointScale(scaling, precision)) };
        default:
            return command;
    }
};

const scale = (path: string, from: number, to: number, precision: number = 0): string =>
    commandsToString(parsePath(path).map(commandScale(to / from, precision)));

const currentPointer = (commands: Command[]): Point => {
    // helper constants
    const gone = { x: 0, y: 0 };
    const found = { x: undefined, y: undefined };
    let zFound = false;
    // helper functions
    const setFound = ({ x, y }: $Shape<Point>) => {
        if (x !== undefined && found.x === undefined) found.x = x + gone.x;
        if (y !== undefined && found.y === undefined) found.y = y + gone.y;
    };
    const pointFound = (): boolean => found.x !== undefined && found.y !== undefined;
    const setGone = ({ x, y }: $Shape<Point>) => {
        if (x !== undefined) gone.x = x;
        if (y !== undefined) gone.y = y;
    };
    const addGone = ({ x, y }: $Shape<Point>) => {
        if (x !== undefined) gone.x += x;
        if (y !== undefined) gone.y += y;
    };
    // object to be traversed
    const reversed = [...commands];
    reversed.reverse();

    // logic to find the point by traversing
    for (const command of reversed) {
        const { letter, points, values } = command;
        if (zFound) {
            if (letter === 'M') return points[0]; // early exit
            if (letter === 'm') {
                setGone(points[0]);
                zFound = false; // reset that bool, because traversing now starts normally again
            }
            continue;
        }
        if (/z/i.test(letter)) zFound = true;
        if (/[MLCSQT]/.test(letter)) setFound(points[points.length - 1]);
        if (/[mlcsqt]/.test(letter)) addGone(points[points.length - 1]);
        if (letter === 'h') addGone({ x: values[0] });
        if (letter === 'H') setFound({ x: values[0] });
        if (letter === 'v') addGone({ y: values[0] });
        if (letter === 'V') setFound({ y: values[0] });
        if (letter === 'a') addGone({ x: values[5], y: values[6] });
        if (letter === 'A') setFound({ x: values[5], y: values[6] });
        if (pointFound()) break;
    }
    return { x: found.x || 0, y: found.y || 0 };
};

const currentPointerByPath = (path: string): Point => currentPointer(parsePath(path));

export const SVG = {
    currentPointer,
    currentPointerByPath,
    transition,
    parsePath,
    commandsToString,
    scale,
    requiredPointsForCommand,
    requiredValuesForCommand,
    commandToString,
};

window.SVG = SVG;
