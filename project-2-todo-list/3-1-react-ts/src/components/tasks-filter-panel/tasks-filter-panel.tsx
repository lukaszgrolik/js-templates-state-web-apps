import * as React from 'react';

import { Store, StoreData, TaskStatusFilter } from '../../store';

import './tasks-filter-panel.scss';

interface Props {
    store: Store;
    storeData: StoreData;
}

export class TasksFilterPanel extends React.Component<Props> {
    private getStatusLabel() {
        const { storeData } = this.props;

        switch (storeData.tasksFilter.status) {
            case TaskStatusFilter.All: return 'All tasks';
            case TaskStatusFilter.ToDo: return 'To-do only';
            case TaskStatusFilter.Done: return 'Done only';
        }
    }

    render() {
        const { store, storeData } = this.props;

        return (
            <div className="tasks-filter-panel">
                <div>
                    <button onClick={() => {
                        store.switchStatus();
                    }}>{this.getStatusLabel()}</button>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Filter by task name..."
                        value={storeData.tasksFilter.name}
                        onChange={e => {
                            store.updateNameFilter(e.currentTarget.value);
                        }}
                    />
                </div>
            </div>
        );
    }
}