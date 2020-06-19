import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';

import {MainView} from './components/main-view';
import { Store, TaskResponse } from './store/store';
import * as styles from './styles';

declare global {
    interface Window {
        TASKS: TaskResponse[];
    }
}

const store = new Store({tasks: window.TASKS});
const app = (
    <>
        <Global styles={css`${styles.reset}${styles.main}`} />
        <MainView store={store} />
    </>
);

ReactDOM.render(app, document.getElementById('react-root'));