'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import {receiveTodoItems} from './actionCreators';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(receiveTodoItems(JSON.parse(document.querySelector('.todolist-items').innerHTML)));

const T = ({name}) => (
    <div>Hello, {name}</div>
);

T.propTypes = {
    name: React.PropTypes.string
};

ReactDOM.render(
    <Provider store={store}>
        <T name="Mike"/>
    </Provider>,
    document.querySelector('div[role="main"]')
);
