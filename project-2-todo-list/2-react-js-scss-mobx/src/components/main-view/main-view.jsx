import * as React from 'react';
import {observer} from 'mobx-react';

import { NewTaskForm } from './new-task-form';
import { TasksFilterPanel } from '../tasks-filter-panel/tasks-filter-panel';
import { TasksContentBlock } from './tasks-content-block';

import './main-view.scss';

@observer
export class MainView extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <div className="tasks-block">
                <div className="tasks-block-heading">
                    <h1>My to-do list</h1>
                </div>

                <div className="tasks-header">
                    <div>
                        <NewTaskForm store={store} />
                    </div>

                    <div>
                        <TasksFilterPanel store={store} />
                    </div>
                </div>

                <div>
                    <TasksContentBlock store={store} />
                </div>
            </div>
        );
    }
}