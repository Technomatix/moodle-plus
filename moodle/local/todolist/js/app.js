'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import {receiveTodoItems} from './actionCreators';
import {TodoListContainer} from './components/TodoList';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(receiveTodoItems(JSON.parse(document.querySelector('.todolist-items').innerHTML)));

ReactDOM.render(
    <Provider store={store}>
        <TodoListContainer/>
    </Provider>,
    document.querySelector('div[role="main"]')
);
