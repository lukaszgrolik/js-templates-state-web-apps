import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';

import {Store, Task} from '../../store/store';
import {EditTaskNameForm} from './edit-task-name-form';

const Wrapper = styled.div`
	background: rgba(255, 255, 255, .5);
	display: flex;
	align-items: center;
	transition: background-color .2s;

	&:hover {
		background-color: rgba(255, 255, 255, .75);
	}
`;
const IsDoneControlBlock = styled.div`
	padding: .5em;

	input {
		width: 2em;
		height: 2em;
	}
`;
const NameBlock = styled.div<{isDone: boolean}>`
	padding: .5em;
	flex-grow: 1;
	${props => props.isDone && css`
		color: #777;
		text-decoration: line-through;
	`};
`;
const OrderControlBlock = styled.div`
	padding: .5em;
`;
const DeleteControlBlock = styled.div`
	padding: .5em;

	button {
		width: 3em;
		height: 2.5em;
	}
`;

interface Props {
	store: Store;
	task: Task;
}

@observer
export class TaskBlock extends React.Component<Props> {
	@observable editTaskName = false;

	render() {
		const {store, task} = this.props;

		return (
			<Wrapper>
				<IsDoneControlBlock>
					<input
						type="checkbox"
						checked={task.isDone}
						onChange={e => {
							task.isDone = e.currentTarget.checked;
						}}
					/>
				</IsDoneControlBlock>

				<NameBlock isDone={task.isDone}>
					{
						this.editTaskName == false
						?
						<div onClick={() => {
							this.editTaskName = true;
						}}>
							{task.name}
						</div>
						:
						<div>
							<EditTaskNameForm
								store={store}
								task={task}
								onEditFinished={() => {
									this.editTaskName = false;
								}}
							/>
						</div>
					}
				</NameBlock>

				<OrderControlBlock>
					<div>
						<button>
							<i className="fa fa-fw fa-angle-up" aria-hidden="true"></i>
						</button>
					</div>

					<div>
						<button>
							<i className="fa fa-fw fa-angle-down" aria-hidden="true"></i>
						</button>
					</div>
				</OrderControlBlock>

				<DeleteControlBlock>
					<button onClick={() => {
						store.deleteTask(task);
					}}>
						<i className="fa fa-fw fa-close" aria-hidden="true"></i>
					</button>
				</DeleteControlBlock>
			</Wrapper>
		);
	}
}