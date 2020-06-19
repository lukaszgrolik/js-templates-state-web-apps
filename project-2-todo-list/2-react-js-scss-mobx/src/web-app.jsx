import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Store} from './store/store';
import {MainView} from './components/main-view/main-view';

import './reset.scss';
import './main.scss';

const store = new Store({tasks: window.TASKS});
const app = (
    <MainView store={store} />
);

ReactDOM.render(app, document.getElementById('react-root'));