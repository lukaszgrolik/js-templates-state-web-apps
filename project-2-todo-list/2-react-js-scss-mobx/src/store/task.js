import { observable } from 'mobx';

import { Store } from './store';

export class Task {
	readonly id;

	@observable name = '';
	@observable isDone = false;

	constructor(readonly store, body) {
		this.id = body.id;
		this.name = body.name;
		this.isDone = body.isDone;
	}
}