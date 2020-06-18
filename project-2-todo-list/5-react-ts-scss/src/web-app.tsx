import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Store, StoreData} from './store';
import {MainView} from './components/main-view';

import './reset.scss';
import './main.scss';

const tasks = [
    {
        id: 1,
        name: "Buy milk",
        isDone: false,
    },
    {
        id: 2,
        name: "Dentist appointment on Tuesday at 9:00",
        isDone: false,
    },
    {
        id: 3,
        name: "Pay rent & bills",
        isDone: true,
    },
    {
        id: 4,
        name: "Meeting this weekend",
        isDone: false,
    },
];

interface Props {}
interface State {
    storeData: StoreData;
}

class WebApp extends React.Component<Props, State> {
    private store = new Store({ tasks }, {
        onStart: data => {
            this.state = {
                storeData: data,
            };
        },
        onDataUpdate: data => {
            this.setState({ storeData: data });
        },
    });

    render() {
        return (
            <MainView storeData={this.state.storeData} store={this.store} />
        );
    }
}

ReactDOM.render(<WebApp />, document.getElementById('react-root'));