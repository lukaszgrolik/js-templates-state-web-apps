import * as React from 'react';
import {observer} from 'mobx-react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';

import {Store, Task} from './store/store';

const Wrapper = styled.div`
	display: flex;
    align-items: center;
`;
const IsDoneControlBlock = styled.div`
	padding: .5em;
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
`;

interface Props {
	store: Store;
	task: Task;
}

@observer
export class TaskBlock extends React.Component<Props> {
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

				<NameBlock isDone={task.isDone}>{task.name}</NameBlock>

				<OrderControlBlock>
					<div><button>up</button></div>
					<div><button>down</button></div>
				</OrderControlBlock>

				<DeleteControlBlock>
					<button onClick={() => {
						store.deleteTask(task);
					}}>del</button>
				</DeleteControlBlock>
			</Wrapper>
		);
	}
}