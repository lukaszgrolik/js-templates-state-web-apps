import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {MainView} from './src/main-view';
// import { Store } from './src/store/store';

// const store = new Store();

window.TASKS = [
	{
		name: "Buy milk",
		isDone: false,
		order: 0,
	},
	{
		name: "Ipsum",
		isDone: false,
		order: 1,
	},
	{
		name: "Dolor",
		isDone: true,
		order: 2,
	},
	{
		name: "Sit",
		isDone: false,
		order: 3,
	},
];

const app = (
	// <MainView store={store} />
	<MainView />
);

ReactDOM.render(app, document.getElementById('react-root'));