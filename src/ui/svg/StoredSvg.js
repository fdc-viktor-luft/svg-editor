// @flow

import React from 'react';
import { type SvgInfo } from '../../store/store';
import { EditorStore } from '../../store/editor-store';

type StoredSvgProps = {| svg: SvgInfo, index: number |};

export const StoredSvg = ({ svg, index }: StoredSvgProps) => {
    const { attr, path, name } = svg;
    const { width, height, fill, stroke } = attr;
    return (
        <div className="stored-svg">
            <svg viewBox={`0 0 ${width} ${height}`}>
                {path && (
                    <path
                        fill={fill ? 'currentColor' : 'none'}
                        stroke={stroke ? 'currentColor' : 'none'}
                        strokeLinecap={stroke && stroke.linecap}
                        strokeLinejoin={stroke && stroke.linejoin}
                        strokeWidth={stroke && stroke.width}
                        d={path}
                    />
                )}
            </svg>
            <div className="label">
                {name}
                <span className="buttons">
                    <button onClick={() => EditorStore.select(svg, index)}>Edit</button>
                    <button onClick={() => EditorStore.select(svg)}>Copy</button>
                </span>
            </div>
        </div>
    );
};
