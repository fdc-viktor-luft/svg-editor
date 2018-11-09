// @flow

import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Navigator } from './editor/Navigator';

export const App = () => (
    <div className="App">
        <Header />
        <Main />
        <Navigator />
    </div>
);
