// @flow

import { Wired } from 'react-rewired';
import { type Command, SVG, type Point } from '../logic';

export type StrokeLinecap = 'butt' | 'round' | 'square';
export type StrokeLinejoin = 'miter' | 'round' | 'bevel';
export const StrokeLinecaps: StrokeLinecap[] = ['butt', 'round', 'square'];
export const StrokeLinejoins: StrokeLinejoin[] = ['miter', 'round', 'bevel'];

export type SvgStroke = {
    width?: number,
    linecap?: StrokeLinecap,
    linejoin?: StrokeLinejoin,
};
export type SvgAttributes = { width: number, height: number, precision: number, fill: boolean, stroke?: SvgStroke };
export type SvgInfo = { name: string, path: string, attr: SvgAttributes };
export type EditorState = {
    svg: SvgInfo,
    commands: Command[],
    aPoint: number,
    aCommand: number,
    oPoint?: Point,
    edit: boolean,
};

const initialName = 'Unnamed';
const initialPath = 'M0 0';
const initialAttributes = { width: 1000, height: 1000, precision: 0, fill: false, stroke: undefined };
export const initialSvgInfo = { name: initialName, path: initialPath, attr: initialAttributes };
const initialCommands = SVG.parsePath(initialPath);
export const initialEditorState: EditorState = {
    svg: initialSvgInfo,
    commands: initialCommands,
    aPoint: 0,
    aCommand: 0,
    oPoint: undefined,
    edit: false,
};

export const Store = Wired.store({
    svgList: ([]: SvgInfo[]),
    currentSvg: 0,
    editor: Wired.node({
        svg: Wired.node({
            name: initialName,
            path: initialPath,
            attr: Wired.node(initialAttributes),
        }),
        commands: initialCommands,
        aPoint: 0,
        aCommand: 0,
        oPoint: (undefined: Point | void),
        edit: false,
    }),
});

window.Store = Store;
