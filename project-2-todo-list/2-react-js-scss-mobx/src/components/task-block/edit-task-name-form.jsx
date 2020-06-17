import * as React from 'react';

import { Store, Task } from '../../store/store';

import './edit-task-name-form.scss';

interface Props {
	store: Store;
	task: Task;
	onEditFinished: () => void;
}

export class EditTaskNameForm extends React.Component<Props> {
	state = {
		taskName: '',
	};

	constructor(props: Props) {
		super(props);

		this.state.taskName = props.task.name;
	}

	render() {
		const { store, task, onEditFinished } = this.props;

		return (
			<form className="task-name-form" onSubmit={e => {
				e.preventDefault();

				task.name = this.state.taskName;

				onEditFinished();
			}}>
				<div>
					<input
						type="text"
						placeholder="Edit task name..."
						autoFocus
						value={this.state.taskName}
						onChange={e => {
							this.setState({taskName: e.currentTarget.value});
						}}
					/>
				</div>

				<div className="task-name-form-control-buttons-block">
					<div>
						<button type="submit" disabled={this.state.taskName == ''}>
							<i className="fa fa-fw fa-check" aria-hidden="true"></i>
						</button>
					</div>

					<div>
						<button type="button" onClick={() => {
							onEditFinished();
						}}>
							<i className="fa fa-fw fa-close" aria-hidden="true"></i>
						</button>
					</div>
				</div>
			</form>
		);
	}
}