import './assets/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './ui/App';
import { Store } from './store/store';

ReactDOM.render(
    <Store.root>
        <App />
    </Store.root>,
    document.getElementById('root')
);
