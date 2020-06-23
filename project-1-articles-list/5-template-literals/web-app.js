import {mainView} from './components/main-view/main-view.js';

const appRoot = document.getElementById('app-root');
appRoot.innerHTML = mainView(window.ARTICLES);