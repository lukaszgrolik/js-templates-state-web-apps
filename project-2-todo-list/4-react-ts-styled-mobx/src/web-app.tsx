import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';

import {MainView} from './components/main-view';
import { Store, TaskResponse } from './store/store';
import * as styles from './styles';

const tasks: TaskResponse[] = [
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
    <>
        <Global styles={css`${styles.reset}${styles.main}`} />
        <MainView store={store} />
    </>
);

ReactDOM.render(app, document.getElementById('react-root'));