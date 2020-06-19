import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Store, TaskResponse} from './store/store';
import {MainView} from './components/main-view/main-view';

import './reset.scss';
import './main.scss';

declare global {
    interface Window {
        TASKS: TaskResponse[];
    }
}

const store = new Store({tasks: window.TASKS});
const app = (
    <MainView store={store} />
);

ReactDOM.render(app, document.getElementById('react-root'));