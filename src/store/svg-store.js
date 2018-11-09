// @flow

import { Persistore } from 'persistore';
import { Store, type SvgInfo } from './store';

const _key = 'svgs';
const _currentKey = 'current_svg';

const initialSvgList = [];

const get = (): SvgInfo[] => {
    try {
        const parsed = JSON.parse((Persistore.get(_key): any));
        return Array.isArray(parsed) ? parsed : initialSvgList;
    } catch (e) {
        return initialSvgList;
    }
};

const getCurrent = (): number | void => {
    const current = Number(Persistore.get(_currentKey));
    const list = get();
    return !isNaN(current) && list[current] ? current : undefined;
};

const setCurrent = (currentSvg?: number): void => {
    currentSvg !== undefined ? Persistore.set(_currentKey, currentSvg.toString()) : Persistore.remove(_currentKey);
    Store.set({ currentSvg });
};

const persist = () => Persistore.set(_key, JSON.stringify(Store.data.svgList));

const set = (svg: SvgInfo): void => {
    const list = get();
    const current = getCurrent();
    if (current !== undefined) list[current] = svg;
    else list.push(svg);
    Store.set({ svgList: list });
    persist();
};

Store.set({ svgList: get(), currentSvg: getCurrent() });

export const SvgStore = { get, set, getCurrent, setCurrent };
