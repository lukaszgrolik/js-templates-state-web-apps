import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import { Store, TaskStatusFilter } from '../../store/store';

import './tasks-filter-panel.scss';

interface Props {
    store: Store;
}

@observer
export class TasksFilterPanel extends React.Component<Props> {
    @computed private get statusLabel() {
        const { store } = this.props;

        switch (store.tasksFilter.status) {
            case TaskStatusFilter.All: return 'All tasks';
            case TaskStatusFilter.ToDo: return 'To-do only';
            case TaskStatusFilter.Done: return 'Done only';
        }
    }

    render() {
        const { store } = this.props;

        return (
            <div className="tasks-filter-panel">
                <div>
                    <button onClick={() => {
                        store.tasksFilter.switchStatus();
                    }}>{this.statusLabel}</button>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Filter by task name..."
                        value={store.tasksFilter.name}
                        onChange={e => {
                            store.tasksFilter.name = e.currentTarget.value;
                        }}
                    />
                </div>
            </div>
        );
    }
}