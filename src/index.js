// @flow

// $FlowFixMe
import './assets/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/App';
import * as serviceWorker from './serviceWorker';
import { Store } from './store/store';

const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Store.root>
            <App />
        </Store.root>,
        root
    );

serviceWorker.register();
