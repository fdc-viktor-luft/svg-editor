import { Persistore } from 'persistore';
import { SVG, Command, Point, CommandLetter } from '../logic';
import { Store, SvgInfo, EditorState, initialEditorState } from './store';
import { SvgStore } from './svg-store';
import { Util } from '../util/Util';

const _key = 'editor';

const getInitialPointsForCommand = (command: CommandLetter): Point[] =>
    Util.array(SVG.requiredPointsForCommand(command)).map(() => ({ x: 0, y: 0 }));

const getInitialValuesForCommand = (command: CommandLetter): number[] =>
    Util.array(SVG.requiredValuesForCommand(command)).map(() => 0);

const get = (): EditorState => {
    try {
        return JSON.parse(Persistore.get(_key) || '');
    } catch (e) {
        return initialEditorState;
    }
};

const persist = () => Persistore.set(_key, JSON.stringify(Store.get().editor));

const set = (stateChanges: Partial<EditorState>): void => {
    Store.set(({ editor }) => ({
        editor: {
            ...editor,
            ...stateChanges,
            ...(stateChanges.commands
                ? { svg: { ...editor.svg, ...stateChanges.svg, path: SVG.commandsToString(stateChanges.commands) } }
                : {}),
        },
    }));
    persist();
};

const setSvg = (stateChanges: Partial<SvgInfo>): void => {
    Store.set(({ editor }) => ({ editor: { ...editor, svg: { ...editor.svg, ...stateChanges } } }));
    persist();
};

const addCommand = (letter: CommandLetter): void => {
    const { commands } = Store.get().editor;
    set({
        aPoint: 0,
        commands: [
            ...commands,
            { letter, points: getInitialPointsForCommand(letter), values: getInitialValuesForCommand(letter) },
        ],
    });
    activateCommand(commands.length);
};

const removeCommand = (cIndex: number): void => {
    const { commands, aCommand } = Store.get().editor;
    if (cIndex < commands.length && cIndex > 0) {
        const currentlySelected = cIndex === aCommand;
        if (currentlySelected) activateCommand(cIndex - 1);
        set({
            commands: [...commands.slice(0, cIndex), ...commands.slice(cIndex + 1)],
        });
    }
};

const activateCommand = (aCommand: number): void => {
    const { commands } = Store.get().editor;
    if (aCommand < commands.length) {
        const oPoint = aCommand > 0 ? SVG.currentPointer(commands.slice(0, aCommand)) : undefined;
        set({ aCommand, oPoint, aPoint: 0 });
    }
};

const updateValue = (value: number, vIndex: number = 0): void => {
    const { commands, aCommand } = Store.get().editor;
    const command = commands[aCommand];
    updateCommand({ ...command, values: Util.nextArray(command.values, vIndex, value) });
};

const updatePoint = (point: Point): void => {
    const { commands, aPoint, aCommand } = Store.get().editor;
    const command = commands[aCommand];
    updateCommand({ ...command, points: Util.nextArray(command.points, aPoint, point) });
};

const updateCommand = (command: Command) => {
    const { commands, aCommand } = Store.get().editor;
    set({ commands: Util.nextArray(commands, aCommand, command) });
};

const select = (svg: SvgInfo, index?: number) => {
    const { name, path, attr } = svg;
    const { width, height, fill, stroke, precision } = attr;
    const commands = SVG.parsePath(svg.path);
    set({
        svg: { name, path, attr: { width, height, fill, stroke, precision } },
        aCommand: 0,
        aPoint: 0,
        commands,
        edit: true,
    });
    activateCommand(commands.length - 1);
    SvgStore.setCurrent(index);
};

const clear = () => {
    Persistore.remove(_key);
    Store.set(({ editor }) => ({ editor: { ...editor, edit: false } }));
    SvgStore.setCurrent(undefined);
};

Store.set({ editor: get() });

export const EditorStore = {
    get,
    set,
    setSvg,
    clear,
    select,
    updatePoint,
    updateValue,
    activateCommand,
    addCommand,
    removeCommand,
};
