export interface Task {
	id: number;
	name: string;
	isDone: boolean;
}

interface TaskResponse {
	id: number;
	name: string;
	isDone: boolean;
}

interface TaskCreatePayload {
	name: string;
}

interface TaskUpdatePayload {
	name?: string;
	isDone?: boolean;
}

export enum TaskStatusFilter {
	All,
	ToDo,
	Done,
}

export interface StoreData {
	tasks: Task[];
	filteredTasks: Task[];
	tasksFilter: {
		status: TaskStatusFilter;
		name: string;
	};
};

interface StoreDefaultData {
	tasks: TaskResponse[];
}

interface StoreOpts {
	onStart: (data: StoreData) => void;
	onDataUpdate: (data: StoreData) => void;
}

export class Store {
	private data: StoreData = {
		tasks: [],
		filteredTasks: [],
		tasksFilter: {
			status: TaskStatusFilter.All,
			name: '',
		},
	};
	private opts: StoreOpts;

	constructor(defaultData: StoreDefaultData, opts: StoreOpts) {
		this.opts = opts;

		if (defaultData.tasks) {
			this.data.tasks = defaultData.tasks;
			this.data.filteredTasks = defaultData.tasks;
		}

		opts.onStart(this.data);
	}

	createTask(task: TaskCreatePayload) {
		this.data.tasks.push({
			id: Date.now(),
			name: task.name,
			isDone: false,
		});

		this.opts.onDataUpdate({ ...this.data });
	}

	updateTask(task: Task, body: TaskUpdatePayload) {
		var found = this.data.tasks.find(t => t.id === task.id);

		if (found) {
			if (body.name !== undefined) found.name = body.name;
			if (body.isDone !== undefined) found.isDone = body.isDone;

			this.opts.onDataUpdate({ ...this.data });
		}
	}

	deleteTask(task: Task) {
		var index = this.data.tasks.indexOf(task);

		if (index > -1) {
			this.data.tasks.splice(index, 1);

			this.opts.onDataUpdate({ ...this.data });
		}
	}

	switchStatus() {
		const tasksFilter = this.data.tasksFilter;
		const status = tasksFilter.status;

		if (status == TaskStatusFilter.All) tasksFilter.status = TaskStatusFilter.ToDo;
		else if (status == TaskStatusFilter.ToDo) tasksFilter.status = TaskStatusFilter.Done;
		else if (status == TaskStatusFilter.Done) tasksFilter.status = TaskStatusFilter.All;

		this.data.filteredTasks = this.getFilteredTasks(this.data),

		this.opts.onDataUpdate({ ...this.data });

	}

	updateNameFilter(value: string) {
		this.data.tasksFilter.name = value;
		this.data.filteredTasks = this.getFilteredTasks(this.data),

		this.opts.onDataUpdate({...this.data});
	}

	private getFilteredTasks(currentData: StoreData) {
		// small optimization - don't filter through all the tasks if the filter settings are set to default
		if (currentData.tasksFilter.status == TaskStatusFilter.All && currentData.tasksFilter.name == '') return currentData.tasks;

		return currentData.tasks.filter(task => {
			if (currentData.tasksFilter.status == TaskStatusFilter.ToDo && task.isDone) return false;
			if (currentData.tasksFilter.status == TaskStatusFilter.Done && task.isDone == false) return false;

			// case insensitive search
			return task.name.toLowerCase().includes(currentData.tasksFilter.name.toLowerCase());
		});
	}
}