import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Store} from './store/store';
import {MainView} from './components/main-view/main-view';

import './reset.scss';
import './main.scss';

const tasks = [
    {
        id: 1,
        name: "Buy milk",
        isDone: false,
    },
    {
        id: 2,
        name: "Dentist appointment on Tuesday at 9:00",
        isDone: false,
    },
    {
        id: 3,
        name: "Pay rent & bills",
        isDone: true,
    },
    {
        id: 4,
        name: "Meeting this weekend",
        isDone: false,
    },
];

const store = new Store({
    tasks,
});

const app = (
    <MainView store={store} />
);

ReactDOM.render(app, document.getElementById('react-root'));