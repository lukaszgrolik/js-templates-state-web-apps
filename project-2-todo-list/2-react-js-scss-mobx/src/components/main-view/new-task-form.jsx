import * as React from 'react';
import {observer} from 'mobx-react';
import { observable } from 'mobx';

import './new-task-form.scss';

@observer
export class NewTaskForm extends React.Component {
    @observable newTaskName = '';

    render() {
        const { store } = this.props;

        return (
            <form className="new-task-form" onSubmit={e => {
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
            </form>
        );
    }
}