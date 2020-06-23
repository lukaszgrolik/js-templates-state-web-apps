import * as React from 'react';
import {observer} from 'mobx-react';
import styled from '@emotion/styled';

import {Store} from '../../store/store';
import {NewTaskForm} from './new-task-form';
import {TasksFilterPanel} from '../tasks-filter-panel';
import {TasksContentBlock} from './tasks-content-block';

const Wrapper = styled.div`
    background-color: #dcb;
    margin: 0 auto;
    max-width: 720px;
`;
const Heading = styled.div`
    background-color: #333;
    padding: 2em;
    padding-top: 3em;

    h1 {
        color: rgba(255, 255, 255, .85);
        font-family: "Source Serif Pro";
        font-size: 4em;
        font-weight: bold;
    }
`;
const TasksHeader = styled.div`
    background-color: rgba(255, 255, 255, .25);
    padding: 2em;
    padding-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface Props {
    store: Store;
}

@observer
export class MainView extends React.Component<Props> {
    render() {
        const {store} = this.props;

        return (
            <Wrapper>
                <Heading>
                    <h1>My to-do list</h1>
                </Heading>

                <TasksHeader>
                    <div>
                        <NewTaskForm store={store} />
                    </div>

                    <div>
                        <TasksFilterPanel store={store} />
                    </div>
                </TasksHeader>

                <div>
                    <TasksContentBlock store={store} />
                </div>
            </Wrapper>
        );
    }
}