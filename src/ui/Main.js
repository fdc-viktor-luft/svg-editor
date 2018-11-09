// @flow

import React from 'react';
import { StoredSvgList } from './svg/StoredSvgList';
import { Editor } from './editor/Editor';

export const Main = () => (
    <main>
        <Editor />
        <StoredSvgList />
    </main>
);
