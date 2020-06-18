import { observable, action } from 'mobx';

import { Task } from './task';
import { TasksFilter } from './tasks-filter';

export * from './task';
export * from './tasks-filter';

export interface TaskResponse {
    id: number;
    name: string;
    isDone: boolean;
}

export interface TaskPayload {
    name: string;
}

interface StoreOpts {
    tasks: TaskResponse[];
}

export class Store {
    readonly tasksFilter = new TasksFilter(this);

    @observable tasks: Task[] = [];

    constructor(opts: StoreOpts) {
        const tasks = opts.tasks.map(t => new Task(this, t));
        this.tasks.push(...tasks)
    }

    @action createTask(task: TaskPayload) {
        const data = {
            id: Date.now(),
            name: task.name,
            isDone: false,
        };
        this.tasks.push(new Task(this, data));
    }

    @action deleteTask(task: Task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
}