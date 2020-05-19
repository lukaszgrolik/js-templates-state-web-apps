import * as React from 'react';

import {TaskBlock} from './task-block';

export class MainView extends React.Component {
    render() {
        const tasks = window.TASKS;

        return (
            <div className="tasks-block">
                <div className="tasks-block-heading">
                    <h1>To-do list</h1>
                </div>

                <div className="tasks-filter-panel">
                    <div>filter</div>
                    <div>sort</div>
                </div>

                <div>
                    <ul className="tasks-list">
                        {
                            tasks.map(task => {
                                return (
                                    <li>
                                        <TaskBlock task={task} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}