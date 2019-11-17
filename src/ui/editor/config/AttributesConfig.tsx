import React, { Component } from 'react';
import { EventUtil } from '../../../util/event-util';
import {
    Store,
    SvgAttributes,
    SvgStroke,
    StrokeLinecaps,
    StrokeLinejoins,
    StrokeLinejoin,
    StrokeLinecap,
} from '../../../store/store';
import { EditorStore } from '../../../store/editor-store';
import { Select, toSelectOptions } from '../../../form/select';

const StrokeLinecapOptions = toSelectOptions(StrokeLinecaps, 'Linecap...');
const StrokeLinejoinOptions = toSelectOptions(StrokeLinejoins, 'Linejoin...');

type AttributesConfigProps = { attr: SvgAttributes };

export class AttributesConfigContainer extends Component<AttributesConfigProps> {
    onChangeSvgAttributes = (attrChanges: Partial<SvgAttributes>) => {
        EditorStore.setSvg({ attr: { ...this.props.attr, ...attrChanges } });
    };
    onChangeWidth = (width?: number) => width && width > 0 && this.onChangeSvgAttributes({ width });
    onChangeHeight = (height?: number) => height && height > 0 && this.onChangeSvgAttributes({ height });
    onToggleFill = () => this.onChangeSvgAttributes({ fill: !this.props.attr.fill });
    onToggleStroke = () => this.onChangeSvgAttributes({ stroke: !this.props.attr.stroke ? {} : undefined });
    onChangeStroke = (stroke: SvgStroke) =>
        this.onChangeSvgAttributes({ stroke: { ...this.props.attr.stroke, ...stroke } });
    onChangeStrokeWidth = (width?: number) => this.onChangeStroke({ width: width && width >= 0 ? width : undefined });
    onChangeStrokeLinecap = (linecap?: StrokeLinecap) => this.onChangeStroke({ linecap });
    onChangeStrokeLinejoin = (linejoin?: StrokeLinejoin) => this.onChangeStroke({ linejoin });

    render() {
        const { width, height, fill, stroke } = this.props.attr;
        return (
            <div className="attributes">
                <label>Width</label>
                <input type="number" value={width} onChange={EventUtil.inputHandler(this.onChangeWidth)} />
                <label>Height</label>
                <input type="number" value={height} onChange={EventUtil.inputHandler(this.onChangeHeight)} />
                <label>Fill</label>
                <input type="checkbox" checked={fill} onChange={this.onToggleFill} />
                <label>Stroke</label>
                <input type="checkbox" checked={!!stroke} onChange={this.onToggleStroke} />
                {stroke && (
                    <>
                        <label>Stroke-Width</label>
                        <input
                            type="number"
                            value={stroke.width || ''}
                            onChange={EventUtil.inputHandler(this.onChangeStrokeWidth)}
                        />
                        <Select
                            label="Stroke-Linecap"
                            value={stroke.linecap}
                            options={StrokeLinecapOptions}
                            onChange={this.onChangeStrokeLinecap}
                        />
                        <Select
                            label="Stroke-Linejoin"
                            value={stroke.linejoin}
                            options={StrokeLinejoinOptions}
                            onChange={this.onChangeStrokeLinejoin}
                        />
                    </>
                )}
            </div>
        );
    }
}

export const AttributesConfig = Store.wire<any, any>(AttributesConfigContainer, ({ editor }) => ({
    attr: editor.svg.attr,
}));
