import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import { Store } from '../../store/store';

import './tasks-filter-panel.scss';

@observer
export class TasksFilterPanel extends React.Component {
	@computed get statusLabel() {
		const { store } = this.props;

		switch (store.tasksFilter.status) {
			case 'All': return 'All tasks';
			case 'ToDo': return 'To-do only';
			case 'Done': return 'Done only';
		}
	}

	render() {
		const { store } = this.props;

		return (
			<div className="tasks-filter-panel">
				<div>
					<button onClick={() => {
						store.tasksFilter.switchStatus();
					}}>{this.statusLabel}</button>
				</div>

				<div>
					<input
						type="text"
						placeholder="Filter by task name..."
						value={store.tasksFilter.name}
						onChange={e => {
							store.tasksFilter.name = e.currentTarget.value;
						}}
					/>
				</div>
			</div>
		);
	}
}