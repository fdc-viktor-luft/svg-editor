// @flow

import React, { Component } from 'react';
import { Store, type EditorState, initialSvgInfo } from '../../store/store';
import { Screen } from './Screen';
import { Result } from './Result';
import { EditorStore } from '../../store/editor-store';

type EditorProps = {| editor: EditorState |};

export class EditorContainer extends Component<EditorProps> {
    createNew = () => EditorStore.select(initialSvgInfo);

    render() {
        const { editor } = this.props;
        if (!editor.edit)
            return (
                <div className="editor-placeholder" onClick={this.createNew}>
                    <div>Create new SVG</div>
                </div>
            );

        return (
            <div className="editor">
                <Screen />
                <Result />
            </div>
        );
    }
}

export const Editor = Store.wire(EditorContainer, ({ editor }) => ({ editor }));
