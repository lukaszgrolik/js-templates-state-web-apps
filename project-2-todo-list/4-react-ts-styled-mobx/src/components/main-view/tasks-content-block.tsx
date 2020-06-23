import * as React from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';

import { Store } from '../../store/store';
import { TaskBlock } from '../task-block/task-block';

const Wrapper = styled.div`
    padding: 2em;

    > div + div {
        margin-top: 1em;
    }
`;
const TasksList = styled.ul`
    list-style: none;

    > li + li {
        margin-top: 1px;
    }
`;

interface Props {
    store: Store;
}

@observer
export class TasksContentBlock extends React.Component<Props> {
    render() {
        const { store } = this.props;

        return (
            <Wrapper>
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
            </Wrapper>
        );
    }
}