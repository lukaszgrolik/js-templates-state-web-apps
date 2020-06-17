import * as React from 'react';
import { observable } from 'mobx';
import {observer} from 'mobx-react';
import styled from '@emotion/styled';

import {Store} from '../store/store';
import {TaskBlock} from './task-block/task-block';
import {TasksFilterPanel} from '../components/tasks-filter-panel';

const Wrapper = styled.div`
	background-color: #dcb;
	margin: 0 auto;
	max-width: 720px;
`;
const Heading = styled.div`
	background-color: #333;
	padding: 2em;
	padding-top: 3em;

	h1 {
		color: rgba(255, 255, 255, .85);
		font-family: "Source Serif Pro";
		font-size: 4em;
		font-weight: bold;
	}
`;
const TasksHeader = styled.div`
	background-color: rgba(255, 255, 255, .25);
	padding: 2em;
	padding-bottom: 1em;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const NewTaskForm = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;

	> div + div {
		margin-left: .5em;
	}

	input {
		max-width: 150px;
	}
`;
const TasksContentBlock = styled.div`
	padding: 2em;

	> div + div {
		margin-top: 1em;
	}
`;
const TasksList = styled.ul`
	list-style: none;

	> li + li {
		margin-top: 1px;
	}
`;

interface Props {
	store: Store;
}

@observer
export class MainView extends React.Component<Props> {
	@observable newTaskName = '';

	render() {
		const {store} = this.props;

		return (
			<Wrapper>
				<Heading>
					<h1>My to-do list</h1>
				</Heading>

				<TasksHeader>
					<div>
						<NewTaskForm onSubmit={e => {
							e.preventDefault();

							store.createTask({name: this.newTaskName});

							this.newTaskName = '';
						}}>
							<div>
								<input
									type="text"
									placeholder="New task name..."
									value={this.newTaskName}
									onChange={e => {
										this.newTaskName = e.currentTarget.value;
									}}
								/>
							</div>

							<div>
								<button disabled={this.newTaskName == ''}>Add</button>
							</div>
						</NewTaskForm>
					</div>

					<div>
						<TasksFilterPanel store={store} />
					</div>
				</TasksHeader>

				<div>
					<TasksContentBlock>
						<div>
							{
								store.tasks.length == 0
								?
								<p>No tasks found. Use the form above to add a new task.</p>
								:
								<p>Showing {store.tasksFilter.tasks.length} tasks ({store.tasks.length} total)</p>
							}
						</div>

						{
							store.tasks.length > 0
							&&
							<div>
								<TasksList>
									{
										store.tasksFilter.tasks.map(task => {
											return (
												<li key={task.id}>
													<TaskBlock store={store} task={task} />
												</li>
											);
										})
									}
								</TasksList>
							</div>
						}
					</TasksContentBlock>
				</div>
			</Wrapper>
		);
	}
}