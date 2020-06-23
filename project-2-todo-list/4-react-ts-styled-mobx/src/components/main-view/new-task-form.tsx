import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';

import { Store } from '../../store/store';

const Wrapper = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div + div {
        margin-left: .5em;
    }

    input {
        max-width: 150px;
    }
`;

interface Props {
    store: Store;
}

@observer
export class NewTaskForm extends React.Component<Props> {
    @observable newTaskName = '';

    render() {
        const { store } = this.props;

        return (
            <Wrapper onSubmit={e => {
                e.preventDefault();

                store.createTask({ name: this.newTaskName });

                this.newTaskName = '';
            }}>
                <div>
                    <input
                        type="text"
                        placeholder="New task name..."
                        value={this.newTaskName}
                        onChange={e => {
                            this.newTaskName = e.currentTarget.value;
                        }}
                    />
                </div>

                <div>
                    <button disabled={this.newTaskName == ''}>Add</button>
                </div>
            </Wrapper>
        );
    }
}