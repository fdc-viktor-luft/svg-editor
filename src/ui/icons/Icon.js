// @flow

import React from 'react';

type IconContainerProps = {|
    className?: string,
    path: string,
    width: number,
    height: number,
    fill?: boolean,
    stroke?: boolean,
|};

const currentColor = (bool?: boolean): string | void => (bool ? 'currentColor' : 'none');

const IconContainer = ({ className, path, width, height, fill, stroke }: IconContainerProps) => (
    <svg className={className ? className + ' icon' : 'icon'} viewBox={`0 0 ${width} ${height}`}>
        <path fill={currentColor(fill)} stroke={currentColor(stroke)} d={path} />
    </svg>
);

type IconProps = {|
    className?: string,
|};

export const Icon = {
    ArrowUp: (props: IconProps) => (
        <IconContainer path="M1 5l4-4l4 4m-4-4v8" width={10} height={10} stroke {...props} />
    ),
};
