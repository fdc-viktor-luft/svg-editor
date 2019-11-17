import React from 'react';
import { EventUtil } from '../../util/event-util';
import { EditorStore } from '../../store/editor-store';

const onValueChange = (index: number) =>
    EventUtil.inputHandler((value: number) => EditorStore.updateValue(Number(value), index));

type ValuePickerProps = {
    value: number;
    index: number;
};

export const ValuePicker = ({ value, index }: ValuePickerProps) => (
    <div className="point-picker">
        <label>Value</label>
        <input type="number" value={value} onChange={onValueChange(index)} />
    </div>
);
