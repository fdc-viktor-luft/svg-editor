import React, { Component, ReactNode } from 'react';

const flyPanelLeft = '--fly-panel-left';
const flyPanelTop = '--fly-panel-top';
const flyPanelRight = '--fly-panel-right';

type Pos = number | string;
const pos = (v: Pos): string => (typeof v === 'string' ? v : `${v}px`);

const adjustLeftAndTop = (element: any, left: Pos, top: Pos) => {
    element.style.setProperty(flyPanelLeft, pos(left));
    element.style.setProperty(flyPanelTop, pos(top));
};

const adjustRight = (element: any, right: Pos) => {
    element.style.setProperty(flyPanelRight, pos(right));
};

export class FlyPanel extends Component<{ children: ReactNode }> {
    componentDidMount() {
        const panelElement: any = this.panel.current;
        panelElement.addEventListener('touchmove', this.movePanel);
        adjustLeftAndTop(panelElement, 'unset', 0);
        adjustRight(panelElement, 0);
    }

    componentWillUnmount() {
        const panelElement: any = this.panel.current;
        panelElement.removeEventListener('touchmove', this.movePanel);
    }

    panel = React.createRef<HTMLDivElement>();
    onceMouved = false;

    setLeftAndTop = (left: number, top: number) => {
        const panelElement: any = this.panel.current;
        const { width, height } = panelElement.getBoundingClientRect();
        adjustLeftAndTop(panelElement, Math.floor(left - width / 2), Math.floor(top - height / 2));
        if (!this.onceMouved) {
            adjustRight(panelElement, 'unset');
            this.onceMouved = true;
        }
    };

    movePanel = (event: any) => {
        const touches = event.touches;
        const lastTouch = touches[touches.length - 1];
        event.preventDefault();
        this.setLeftAndTop(lastTouch.clientX, lastTouch.clientY);
    };

    render() {
        return (
            <div className="fly-panel" ref={this.panel}>
                {this.props.children}
            </div>
        );
    }
}
