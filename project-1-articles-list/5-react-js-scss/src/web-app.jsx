import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {MainView} from './components/main-view/main-view';

import './reset.scss';
import './main.scss';

const app = (
    <MainView articles={window.ARTICLES} />
);

ReactDOM.render(app, document.getElementById('react-root'));