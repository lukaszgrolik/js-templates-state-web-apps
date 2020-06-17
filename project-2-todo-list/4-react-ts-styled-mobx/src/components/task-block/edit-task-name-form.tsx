import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { Store, Task } from '../../store/store';

const Wrapper = styled.form`
	display: flex;
	align-items: center;

	> div + div {
		margin-left: .25em;
	}
`;
const ControlButtonsBlock = styled.div`
	display: flex;
	align-items: center;

	> div + div {
		margin-left: .25em;
	}
`;

interface Props {
	store: Store;
	task: Task;
	onEditFinished: () => void;
}

@observer
export class EditTaskNameForm extends React.Component<Props> {
	@observable taskName = '';

	constructor(props: Props) {
		super(props);

		this.taskName = props.task.name;
	}

	render() {
		const { store, task, onEditFinished } = this.props;

		return (
			<Wrapper onSubmit={e => {
				e.preventDefault();

				task.name = this.taskName;

				onEditFinished();
			}}>
				<div>
					<input
						type="text"
						placeholder="Edit task name..."
						autoFocus
						value={this.taskName}
						onChange={e => {
							this.taskName = e.currentTarget.value;
						}}
					/>
				</div>

				<ControlButtonsBlock>
					<div>
						<button type="submit" disabled={this.taskName == ''}>
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
				</ControlButtonsBlock>
			</Wrapper>
		);
	}
}