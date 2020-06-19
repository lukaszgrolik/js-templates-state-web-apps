import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { Store, Task } from '../../store/store';

import './edit-task-name-form.scss';

@observer
export class EditTaskNameForm extends React.Component {
    @observable taskName; '';

    constructor(props) {
        super(props);

        this.taskName = props.task.name;
    }

    render() {
        const { store, task, onEditFinished } = this.props;

        return (
            <form className="task-name-form" onSubmit={e => {
                e.preventDefault();

                task.name = this.taskName;

                onEditFinished();
            }}>
                <div>
                    <input
                        type="text"
                        placeholder="Edit task name..."
                        autoFocus
                        value={this.taskName}
                        onChange={e => {
                            this.taskName = e.currentTarget.value;
                        }}
                    />
                </div>

                <div className="task-name-form-control-buttons-block">
                    <div>
                        <button type="submit" disabled={this.taskName == ''}>
                            <i className="fa fa-fw fa-check" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div>
                        <button type="button" onClick={() => {
                            onEditFinished();
                        }}>
                            <i className="fa fa-fw fa-close" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}