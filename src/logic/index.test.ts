/**
 * This file is part of svg-editor which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 */

import { SVG } from './index';

describe('SVG', () => {
    const examplePath = 'M29.375 67L0 20Q35 -6 69 4.9 z M25 84.2L80 0 M36.25 78 L50 100L100 20Q95 15 81.2 9.2z';
    const examplePathAtRoot = SVG.transition(examplePath, 3, 3);

    it('parsePath 1', () => {
        expect(SVG.parsePath(examplePath)).toEqual([
            { letter: 'M', points: [{ x: 29.375, y: 67 }], values: [] },
            { letter: 'L', points: [{ x: 0, y: 20 }], values: [] },
            {
                letter: 'Q',
                points: [
                    { x: 35, y: -6 },
                    { x: 69, y: 4.9 },
                ],
                values: [],
            },
            { letter: 'z', points: [], values: [] },
            { letter: 'M', points: [{ x: 25, y: 84.2 }], values: [] },
            { letter: 'L', points: [{ x: 80, y: 0 }], values: [] },
            { letter: 'M', points: [{ x: 36.25, y: 78 }], values: [] },
            { letter: 'L', points: [{ x: 50, y: 100 }], values: [] },
            { letter: 'L', points: [{ x: 100, y: 20 }], values: [] },
            {
                letter: 'Q',
                points: [
                    { x: 95, y: 15 },
                    { x: 81.2, y: 9.2 },
                ],
                values: [],
            },
            { letter: 'z', points: [], values: [] },
        ]);
    });
    it('parsePath 2', () => {
        expect(SVG.parsePath('M1 5l4-4l4 4m-4-4v8')).toEqual([
            { letter: 'M', points: [{ x: 1, y: 5 }], values: [] },
            { letter: 'l', points: [{ x: 4, y: -4 }], values: [] },
            { letter: 'l', points: [{ x: 4, y: 4 }], values: [] },
            { letter: 'm', points: [{ x: -4, y: -4 }], values: [] },
            { letter: 'v', points: [], values: [8] },
        ]);
    });

    it('commandToString', () => {
        expect(SVG.commandsToString(SVG.parsePath(examplePath))).toBe(
            'M29.375 67L0 20Q35-6 69 4.9zM25 84.2L80 0M36.25 78L50 100L100 20Q95 15 81.2 9.2z'
        );
    });

    it('transition', () => {
        expect(SVG.transition(examplePath, 3, 3)).toBe(
            'M32.375 70L3 23Q38-3 72 7.9zM28 87.2L83 3M39.25 81L53 103L103 23Q98 18 84.2 12.2z'
        );
    });

    it('scale', () => {
        expect(SVG.scale(examplePathAtRoot, 108, 512)).toBe(
            'M153 332L14 109Q180-14 341 37zM133 413L393 14M186 384L251 488L488 109Q465 85 399 58z'
        );
        expect(SVG.scale(examplePathAtRoot, 108, 512, 2)).toBe(
            'M153.48 331.85L14.22 109.04Q180.15-14.22 341.33 37.45zM132.74 413.39L393.48 14.22M186.07 384L251.26 488.3L488.3 109.04Q464.59 85.33 399.17 57.84z'
        );
        expect(
            SVG.scale('M153 332L14 109Q180-14 341 37zM133 413L393 14M186 384L251 488L488 109Q465 85 399 58z', 512, 1000)
        ).toBe('M299 648L27 213Q352-27 666 72zM260 807L768 27M363 750L490 953L953 213Q908 166 779 113z');
    });

    it('currentPointer', () => {
        expect(SVG.currentPointerByPath(examplePath)).toEqual({ x: 36.25, y: 78 });
        expect(SVG.currentPointerByPath('M29.375 67L0 20Q35-6 69 4.9zM25 84.2L80 0')).toEqual({ x: 80, y: 0 });
        expect(SVG.currentPointerByPath('M29.375 67L0 20Q35-6 69 4.9zM25 84.2l75 0')).toEqual({ x: 100, y: 84.2 });
        expect(SVG.currentPointerByPath('M0 0h50v-75v-25l25 25')).toEqual({ x: 75, y: -75 });
        expect(SVG.currentPointerByPath('M0 0h50V-75V-25l25 25')).toEqual({ x: 75, y: 0 });
        expect(
            SVG.currentPointerByPath(
                'M875 638L589 694L534 988zC529 489 627 559 426 748C492 970 914 825 535 516Q528 638 184 649V264h342Q720 301 562 404'
            )
        ).toEqual({ x: 562, y: 404 });
        expect(
            SVG.currentPointerByPath('M875 638L589 694L534 988zQ528 638 184 649V264h342Q720 301 562 404q239 91 270 48')
        ).toEqual({ x: 832, y: 452 });
    });
});
