import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {MainView} from './src/main-view';
import { Store, TaskResponse } from './src/store/store';

const tasks: TaskResponse[] = [
	{
		id: 1,
		name: "Buy milk",
		isDone: false,
		// order: 0,
	},
	{
		id: 2,
		name: "Ipsum",
		isDone: false,
		// order: 1,
	},
	{
		id: 3,
		name: "Dolor",
		isDone: true,
		// order: 2,
	},
	{
		id: 4,
		name: "Sit",
		isDone: false,
		// order: 3,
	},
];

const store = new Store({
	tasks,
});

const app = (
	<MainView store={store} />
);

ReactDOM.render(app, document.getElementById('react-root'));