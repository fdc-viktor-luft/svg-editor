import React, { Component } from 'react';
import { Store, EditorState } from '../../store/store';
import { Config } from './config/Config';
import { Icon } from '../icons/Icon';
import { Util } from '../../util/Util';

type NavigatorProps = { editor: EditorState };
type NavigatorState = { open: boolean };

export class NavigatorContainer extends Component<NavigatorProps, NavigatorState> {
    state: NavigatorState = { open: true };

    toggle = () => this.setState(({ open }) => ({ open: !open }));

    render() {
        const { open } = this.state;
        const { editor } = this.props;
        if (!editor.edit) return null;

        return (
            <div className={Util.classNames('navigator', open && 'open')}>
                <div onClick={this.toggle}>
                    <Icon.ArrowUp className="visibility-toggle" />
                </div>
                <Config />
            </div>
        );
    }
}

export const Navigator = Store.wire<any, any>(NavigatorContainer, ({ editor }) => ({ editor }));
