// @flow

import React from 'react';
import { Store, type EditorState, type SvgStroke } from '../../store/store';

type ResultProps = {| editor: EditorState |};

const fillString = (fill: boolean) => `fill="${fill ? 'currentColor' : 'none'}"`;
const attributeString = (name: string, value?: number | string): string => (value ? ` ${name}="${value}"` : '');
const strokeString = (stroke?: SvgStroke) =>
    stroke
        ? ` stroke="currentColor"${attributeString('stroke-width', stroke.width)}${attributeString(
              'stroke-linecap',
              stroke.linecap
          )}${attributeString('stroke-linejoin', stroke.linejoin)}`
        : '';

export const ResultContainer = ({ editor }: ResultProps) => {
    const { path, attr } = editor.svg;
    const { width, height, fill, stroke } = attr;
    return (
        <div className="result">
            <code>
                {`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'>`}
                <br />
                <span className="tab">{`<path ${fillString(fill)}${strokeString(stroke)}`}</span>
                <br />
                <span className="tab path">{`d="${path}"`}</span>
                <br />
                <span className="tab">{'/>'}</span>
                <br />
                {`</svg>`}
            </code>
        </div>
    );
};

export const Result = Store.wire(ResultContainer, ({ editor }) => ({ editor }));
