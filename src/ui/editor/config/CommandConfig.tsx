import React, { Component } from 'react';
import { CommandLetter, Point } from '../../../logic/index';
import { Select } from '../../../form/select';
import { Util } from '../../../util/Util';
import { PointPicker } from '../../picker/PointPicker';
import { PointColors } from '../../picker/points';
import { Store, EditorState } from '../../../store/store';
import { EditorStore } from '../../../store/editor-store';
import { ValuePicker } from '../../picker/ValuePicker';

const COMMANDS: Array<CommandLetter | undefined> = [
    undefined,
    'M',
    'm',
    'Q',
    'q',
    'L',
    'l',
    'z',
    'A',
    'a',
    'C',
    'c',
    'T',
    't',
    'S',
    's',
    'V',
    'v',
    'H',
    'h',
];
const COMMAND_OPTIONS = COMMANDS.map(c => ({ label: c === undefined ? 'Add Command...' : c, value: c }));

type CommandConfigProps = { editor: EditorState };

export class CommandConfigContainer extends Component<CommandConfigProps> {
    onChooseCommand = (letter?: CommandLetter) => letter && EditorStore.addCommand(letter);

    onActivatePoint = (index: number) => () => EditorStore.set({ aPoint: index });
    onActivateCommand = (aCommand: number) => () => EditorStore.activateCommand(aCommand);
    onRemoveCommand = (aCommand: number) => (event: any) => {
        event.stopPropagation();
        EditorStore.removeCommand(aCommand);
    };

    render() {
        const { editor } = this.props;
        const { commands, aPoint, aCommand } = editor;
        const { points, values } = commands[aCommand];
        return (
            <div className="commands">
                <Select value={undefined} options={COMMAND_OPTIONS} onChange={this.onChooseCommand} />
                {commands.map((c, index) => (
                    <div
                        className={Util.classNames('command', index === aCommand && 'active')}
                        key={index}
                        onClick={this.onActivateCommand(index)}>
                        {c.letter}
                        <button onClick={this.onRemoveCommand(index)} type="button">
                            Remove
                        </button>
                    </div>
                ))}
                {points.map((p: Point, index: number) => (
                    <PointPicker
                        key={index}
                        value={p}
                        active={index === aPoint}
                        onChange={EditorStore.updatePoint}
                        onActivate={this.onActivatePoint(index)}
                        color={PointColors[index]}
                    />
                ))}
                {values.map((v: number, index: number) => (
                    <ValuePicker key={index} value={v} index={index} />
                ))}
            </div>
        );
    }
}

export const CommandConfig = Store.wire<any, any>(CommandConfigContainer, ({ editor }) => ({ editor }));
