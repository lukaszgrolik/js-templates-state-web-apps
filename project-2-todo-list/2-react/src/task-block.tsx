import * as React from 'react';

interface Props {
	task: {};
}

export class TaskBlock extends React.Component<Props> {
	render() {
		const {task} = this.props;

		return (
			<div className="task-block">
				<div className="task-done-control-block">
					<input type="checkbox" checked={task.isDone} />
				</div>

				<div className="task-name-block">{task.name}</div>

				<div className="task-order-control-block">
					<div><button>up</button></div>
					<div><button>down</button></div>
				</div>

				<div className="task-delete-control-block">
					<button>del</button>
				</div>
			</div>
		);
	}
}