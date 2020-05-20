import * as React from 'react';
import { observable } from 'mobx';
import {observer} from 'mobx-react';
import styled from '@emotion/styled';

import {Store} from './store/store';
import {TaskBlock} from './task-block';
import {TasksFilterPanel} from './tasks-filter-panel';

const Wrapper = styled.div`
	background-color: #ccd;
    padding: 2em;
    margin: 0 auto;
    max-width: 720px;

    > div + div {
        margin-top: 2em;
    }
`;
const Heading = styled.div`
	padding-bottom: 1em;
    border-bottom: 1px solid rgba(255, 255, 255, .33);

    h1 {
        color: rgba(0, 0, 0, .66);
        font-family: "Source Serif Pro";
        font-size: 4em;
        font-weight: bold;
    }
`;
const TasksList = styled.ul`
	list-style: none;

    > li + li {
        border-top: 1px solid #ddd;
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
                    <h1>To-do list</h1>
                </Heading>

                <div>
                    <div>
                        <form onSubmit={e => {
                            e.preventDefault();

                            store.createTask({name: this.newTaskName});

                            this.newTaskName = '';
                        }}>
                            <input
                                type="text"
                                placeholder="New task name..."
                                value={this.newTaskName}
                                onChange={e => {
                                    this.newTaskName = e.currentTarget.value;
                                }}
                            />

                            <button>Add</button>
                        </form>
                    </div>

                    <div>
                        <TasksFilterPanel store={store} />
                    </div>
                </div>

                <div>
                    {
                        store.tasks.length == 0
                        ?
                        <p>No tasks found. Use the form above to add a new task.</p>
                        :
                        <div>
                            <div>Showing {store.tasksFilter.tasks.length} tasks ({store.tasks.length} total)</div>

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
                </div>
            </Wrapper>
        );
    }
}