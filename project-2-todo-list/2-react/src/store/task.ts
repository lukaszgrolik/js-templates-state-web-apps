import {observable} from 'mobx';

import {Store, TaskResponse} from './store';

export class Task {
    readonly id: number;

    @observable name = '';
    @observable isDone = false;

    constructor(readonly store: Store, body: TaskResponse) {
        this.id = body.id;
        this.name = body.name;
        this.isDone = body.isDone;
    }
}