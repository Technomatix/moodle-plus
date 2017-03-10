'use strict';

import _ from 'lodash';
import * as WebAPI from './WebAPI';

export const receiveTodoItems = items => ({
    type: 'RECEIVE_TODO_ITEMS',
    items
});

export const receiveTodoItem = item => ({
    type: 'RECEIVE_TODO_ITEM',
    item
});

export const toggleDone = item => ({
    type: 'TOGGLE_DONE',
    item
});

export const toggleDoneThunk = item => dispatch => {
    dispatch(toggleDone(item));
    const i = _.cloneDeep(item);
    i.isDone = !i.isDone;
    WebAPI.putItem(i, (error, response) => {
        dispatch(error ? toggleDone(item) : receiveTodoItem(response.body));
    });
};
