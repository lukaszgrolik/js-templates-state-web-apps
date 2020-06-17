import * as React from 'react';

import { Store, Task } from '../../store/store';
import { EditTaskNameForm } from './edit-task-name-form';

import './task-block.scss';

interface Props {
	store: Store;
	task: Task;
}

export class TaskBlock extends React.Component<Props> {
	state = {
		editTaskName: false,
	};

	render() {
		const { store, task } = this.props;

		return (
			<div className="task-block">
				<div className="task-done-control-block">
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={e => {
							task.isDone = e.currentTarget.checked
						}}
					/>
				</div>

				<div className={`task-name-block${task.isDone ? ' is-done' : ''}`}>
					{
						this.state.editTaskName == false
							?
							<div onClick={() => {
								this.setState({editTaskName: true});
							}}>
								{task.name}
							</div>
							:
							<div>
								<EditTaskNameForm
									store={store}
									task={task}
									onEditFinished={() => {
										this.setState({editTaskName: false});
									}}
								/>
							</div>
					}
				</div>

				<div className="task-delete-control-block">
					<button onClick={() => {
						store.deleteTask(task);
					}}>
						<i className="fa fa-fw fa-close" aria-hidden="true"></i>
					</button>
				</div>
			</div>
		);
	}
}