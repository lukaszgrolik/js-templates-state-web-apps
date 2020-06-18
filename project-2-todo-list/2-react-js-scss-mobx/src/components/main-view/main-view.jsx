import * as React from 'react';
import {observer} from 'mobx-react';

import { Store } from '../../store/store';
import { TaskBlock } from '../task-block/task-block';
import { TasksFilterPanel } from '../tasks-filter-panel/tasks-filter-panel';

import './main-view.scss';

@observer
export class MainView extends React.Component {
    state = {
        newTaskName: ''
    };

    render() {
        const { store } = this.props;

        return (
            <div className="tasks-block">
                <div className="tasks-block-heading">
                    <h1>My to-do list</h1>
                </div>

                <div className="tasks-header">
                    <div>
                        <form className="new-task-form" onSubmit={e => {
                            e.preventDefault();

                            store.createTask({ name: this.state.newTaskName });

                            this.setState({newTaskName: ''});
                        }}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="New task name..."
                                    value={this.state.newTaskName}
                                    onChange={e => {
                                        this.setState({newTaskName: e.currentTarget.value});
                                    }}
                                />
                            </div>

                            <div>
                                <button disabled={this.state.newTaskName == ''}>Add</button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <TasksFilterPanel store={store} />
                    </div>
                </div>

                <div>
                    <div className="tasks-content-block">
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
                            store.tasksFilter.tasks.length > 0
                            &&
                            <div>
                                <div className="tasks-list">
                                    {
                                        store.tasksFilter.tasks.map(task => {
                                            return (
                                                <li key={task.id}>
                                                    <TaskBlock store={store} task={task} />
                                                </li>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}