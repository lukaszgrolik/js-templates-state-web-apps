import { observable, action, computed } from 'mobx';

import { Store } from './store';

export class TasksFilter {
    @observable status = 'All';
    @observable name = '';

    constructor(store) {
        this.store = store;
    }

    @computed get tasks() {
        // small optimization - don't filter through all the tasks if the filter settings are set to default
        if (this.status == 'All' && this.name == '') return this.store.tasks;

        return this.store.tasks.filter(task => {
            if (this.status == 'ToDo' && task.isDone) return false;
            if (this.status == 'Done' && task.isDone == false) return false;

            // case insensitive search
            return task.name.toLowerCase().includes(this.name.toLowerCase());
        });
    }

    @action switchStatus() {
        if (this.status == 'All') this.status = 'ToDo';
        else if (this.status == 'ToDo') this.status = 'Done';
        else if (this.status == 'Done') this.status = 'All';
    }
}