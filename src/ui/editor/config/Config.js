// @flow

import React, { Component } from 'react';
import { EventUtil } from '../../../util/event-util';
import { Store, type EditorState } from '../../../store/store';
import { EditorStore } from '../../../store/editor-store';
import { SvgStore } from '../../../store/svg-store';
import { AttributesConfig } from './AttributesConfig';
import { CommandConfig } from './CommandConfig';

type ConfigProps = {| editor: EditorState |};

export class ConfigContainer extends Component<ConfigProps> {
    onChangeName = (name: string) => EditorStore.set({ svg: { name } });

    onSubmit = () => {
        const { editor } = this.props;
        SvgStore.set(editor.svg);
        EditorStore.clear();
    };

    render() {
        return (
            <div className="config">
                <div className="controls">
                    <div className="svg-name">
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            type="string"
                            value={this.props.editor.svg.name}
                            onChange={EventUtil.inputHandler(this.onChangeName)}
                        />
                    </div>
                    <AttributesConfig />
                    <CommandConfig />
                    <div className="buttons">
                        <button className="clear" onClick={EditorStore.clear}>
                            Clear
                        </button>
                        <button className="submit" onClick={this.onSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export const Config = Store.wire(ConfigContainer, ({ editor }) => ({ editor }));
