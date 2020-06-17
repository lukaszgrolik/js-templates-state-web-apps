import { observable, action, computed } from 'mobx';

import { Store } from './store';

export enum TaskStatusFilter {
	All,
	ToDo,
	Done,
}

export class TasksFilter {
	@observable status = TaskStatusFilter.All;
	@observable name = '';

	constructor(store) {

	}

	@computed get tasks() {
		// small optimization - don't filter through all the tasks if the filter settings are set to default
		if (this.status == TaskStatusFilter.All && this.name == '') return this.store.tasks;

		return this.store.tasks.filter(task => {
			if (this.status == TaskStatusFilter.ToDo && task.isDone) return false;
			if (this.status == TaskStatusFilter.Done && task.isDone == false) return false;

			// case insensitive search
			return task.name.toLowerCase().includes(this.name.toLowerCase());
		});
	}

	@action switchStatus() {
		if (this.status == TaskStatusFilter.All) this.status = TaskStatusFilter.ToDo;
		else if (this.status == TaskStatusFilter.ToDo) this.status = TaskStatusFilter.Done;
		else if (this.status == TaskStatusFilter.Done) this.status = TaskStatusFilter.All;
	}
}