import * as TasksList from '../tasks-list/tasks-list.js';

export const tasksFilterPanelStatusButton = document.querySelector('.tasks-filter-panel button');
export const tasksFilterPanelNameInput = document.querySelector('.tasks-filter-panel input');

function switchFilterPanelStatus() {
	const status = tasksFilterPanelStatusButton.getAttribute('data-status');
	let newStatus;
	switch (status) {
		case "All": newStatus = 'ToDo'; break;
		case "ToDo": newStatus = 'Done'; break;
		case "Done": newStatus = 'All'; break;
	}

	tasksFilterPanelStatusButton.setAttribute('data-status', newStatus);
}

export function updateFilterPanelStatusControlText() {
	const status = tasksFilterPanelStatusButton.getAttribute('data-status');
	let text;
	switch (status) {
		case "All": text = 'All tasks'; break;
		case "ToDo": text = 'To-do only'; break;
		case "Done": text = 'Done only'; break;
	}

	tasksFilterPanelStatusButton.innerText = text;
}

tasksFilterPanelStatusButton.addEventListener('click', e => {
	switchFilterPanelStatus();
	updateFilterPanelStatusControlText();
	TasksList.updateTasksList();
});

tasksFilterPanelNameInput.addEventListener('input', e => {
	TasksList.updateTasksList();
});