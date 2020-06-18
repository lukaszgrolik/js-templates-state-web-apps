import { observable, action } from 'mobx';

import { Task } from './task';
import { TasksFilter } from './tasks-filter';

export * from './task';
export * from './tasks-filter';

export class Store {
    tasksFilter = new TasksFilter(this);

    @observable tasks = [];

    constructor(opts) {
        const tasks = opts.tasks.map(t => new Task(this, t));
        this.tasks.push(...tasks)
    }

    @action createTask(task) {
        const data = {
            id: Date.now(),
            name: task.name,
            isDone: false,
        };
        this.tasks.push(new Task(this, data));
    }

    @action deleteTask(task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}