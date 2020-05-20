import * as React from 'react';
import {observer} from 'mobx-react';
import styled from '@emotion/styled';
import { computed } from 'mobx';

import {Store, TaskStatusFilter} from './store/store';

const Wrapper = styled.div`

`;

interface Props {
    store: Store;
}

@observer
export class TasksFilterPanel extends React.Component<Props> {
    @computed private get statusLabel() {
        const { store } = this.props;
        const {tasksFilter} = store;

        switch (tasksFilter.status) {
            case TaskStatusFilter.All: return 'All tasks';
            case TaskStatusFilter.ToDo: return 'To-do only';
            case TaskStatusFilter.Done: return 'Done only';
        }
    }

    render() {
        const {store} = this.props;
        const { tasksFilter } = store;

        return (
            <Wrapper>
                <div>
                    <button onClick={() => {
                        tasksFilter.switchStatus();
                    }}>{this.statusLabel}</button>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Filter by task name..."
                        value={tasksFilter.name}
                        onChange={e => {
                            tasksFilter.name = e.currentTarget.value;
                        }}
                    />
                </div>
            </Wrapper>
        );
    }
}