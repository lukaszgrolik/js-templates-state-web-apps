import { observable } from 'mobx';

import { Store } from './store';

export class Task {
    @observable name = '';
    @observable isDone = false;

    constructor(store, body) {
        this.store = store;
        this.id = body.id;
        this.name = body.name;
        this.isDone = body.isDone;
    }
}