// @flow

import React, { Component } from 'react';
import { Store, type SvgInfo } from '../../store/store';
import { StoredSvg } from './StoredSvg';

type StoredSvgListProps = {| svgList: SvgInfo[] |};

export class StoredSvgListContainer extends Component<StoredSvgListProps> {
    render() {
        const { svgList } = this.props;
        return (
            <div className="store">
                <h2>Stored SVGs:</h2>
                {svgList.map((svg, index) => (
                    <StoredSvg svg={svg} index={index} key={index} />
                ))}
            </div>
        );
    }
}

export const StoredSvgList = Store.wire(StoredSvgListContainer, ({ svgList }) => ({ svgList }));
