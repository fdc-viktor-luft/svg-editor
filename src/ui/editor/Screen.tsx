import React, { Component } from 'react';
import { Point, CommandLetter } from '../../logic/index';
import { Util } from '../../util/Util';
import { PointColors } from '../picker/points';
import { EditorState, Store } from '../../store/store';
import { EditorStore } from '../../store/editor-store';

type ScreenProps = { editor: EditorState };

const getRelativeAddition = (letter: CommandLetter, oPoint?: Point) =>
    letter.toLowerCase() === letter && oPoint ? oPoint : { x: 0, y: 0 };

export class ScreenContainer extends Component<ScreenProps> {
    screen = React.createRef<HTMLDivElement>();

    getScreenBounding = (): { top: number; left: number; width: number; height: number } => {
        const { top, left, width, height } = this.screen.current!.getBoundingClientRect();
        return { top, left, width, height };
    };

    click = (event: any) => {
        const { editor } = this.props;
        const { svg, commands, aCommand, oPoint } = editor;
        const { attr } = svg;
        const { width, height, precision } = attr;
        const { points, values, letter } = commands[aCommand];
        const clientPos = { y: event.clientY + window.scrollY, x: event.clientX + window.scrollX };
        const relativeAddition = getRelativeAddition(letter, oPoint);
        const bounding = this.getScreenBounding();
        const clicked = {
            x: Util.rounded(
                ((clientPos.x - bounding.left - window.pageXOffset) * width) / bounding.width - relativeAddition.x,
                precision
            ),
            y: Util.rounded(
                ((clientPos.y - bounding.top - window.pageYOffset) * height) / bounding.height - relativeAddition.y,
                precision
            ),
        };
        if (points.length) {
            EditorStore.updatePoint(clicked);
        } else if (values.length) {
            if (/h/i.test(letter)) EditorStore.updateValue(clicked.x);
            if (/v/i.test(letter)) EditorStore.updateValue(clicked.y);
        }
    };

    render() {
        const { editor } = this.props;
        const { svg, commands, aCommand, oPoint } = editor;
        const { path, attr } = svg;
        const { width, height, fill, stroke } = attr;
        const { points, letter } = commands[aCommand];
        const pointRadius = Math.ceil(width / 100);
        const relativeAddition = getRelativeAddition(letter, oPoint);
        return (
            <div className="screen" onClick={this.click} ref={this.screen}>
                <svg className="screen-bg" viewBox={`0 0 ${width} ${height}`}>
                    {path && (
                        <path
                            stroke={stroke ? 'currentColor' : 'none'}
                            strokeLinecap={stroke && stroke.linecap}
                            strokeLinejoin={stroke && stroke.linejoin}
                            strokeWidth={stroke && stroke.width}
                            fill={fill ? 'currentColor' : 'none'}
                            d={path}
                        />
                    )}
                    {points.map((p: Point, index: number) => (
                        <circle
                            key={index}
                            fill={PointColors[index]}
                            cx={p.x + relativeAddition.x}
                            cy={p.y + relativeAddition.y}
                            r={pointRadius}
                        />
                    ))}
                    {oPoint && (
                        <circle
                            fill="none"
                            stroke="black"
                            strokeWidth={pointRadius / 5}
                            cx={oPoint.x}
                            cy={oPoint.y}
                            r={pointRadius}
                        />
                    )}
                </svg>
            </div>
        );
    }
}

export const Screen = Store.wire<any, any>(ScreenContainer, ({ editor }) => ({ editor }));
