// @flow

import React from 'react';
import type { Point } from '../../logic/index';
import { EventUtil } from '../../util/event-util';

const onPointChange = (point: Point, coordinate: 'x' | 'y', onChange: Point => void): * =>
    EventUtil.inputHandler((num: number) => onChange({ ...point, [coordinate]: Number(num) }));

type PointPickerProps = {
    value: Point,
    onChange: Point => void,
    active: boolean,
    onActivate: void => void,
    color: string,
};

export const PointPicker = ({ value, onChange, active, onActivate, color }: PointPickerProps) => (
    <div
        className="point-picker"
        style={{ border: `2px solid ${color}`, backgroundColor: active ? color : undefined }}
        onClick={onActivate}>
        <label>Point</label>
        <input type="number" value={value.x} onChange={onPointChange(value, 'x', onChange)} />
        <input type="number" value={value.y} onChange={onPointChange(value, 'y', onChange)} />
    </div>
);
