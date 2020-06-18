import * as React from 'react';

import { Store, StoreData } from '../store';
import { TaskBlock } from './task-block/task-block';
import { TasksFilterPanel } from './tasks-filter-panel/tasks-filter-panel';

import './main-view.scss';

interface Props {
    store: Store;
    storeData: StoreData;
}

export class MainView extends React.Component<Props> {
    state = {
        newTaskName: ''
    };

    render() {
        const { store, storeData } = this.props;

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
                        <TasksFilterPanel store={store} storeData={storeData} />
                    </div>
                </div>

                <div>
                    <div className="tasks-content-block">
                        <div>
                            {
                                storeData.tasks.length == 0
                                    ?
                                    <p>No tasks found. Use the form above to add a new task.</p>
                                    :
                                    <p>Showing {storeData.filteredTasks.length} tasks ({storeData.tasks.length} total)</p>
                            }
                        </div>

                        {
                            storeData.tasks.length > 0
                            &&
                            <div>
                                <div className="tasks-list">
                                    {
                                        storeData.filteredTasks.map(task => {
                                            return (
                                                <li key={task.id}>
                                                    <TaskBlock store={store} storeData={storeData} task={task} />
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