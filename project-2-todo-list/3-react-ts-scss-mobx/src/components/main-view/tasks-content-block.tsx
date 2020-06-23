import * as React from 'react';
import { observer } from 'mobx-react';

import { Store } from '../../store/store';
import { TaskBlock } from '../task-block/task-block';

import './tasks-content-block.scss';

interface Props {
    store: Store;
}

@observer
export class TasksContentBlock extends React.Component<Props> {
    render() {
        const { store } = this.props;

        return (
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
        );
    }
}