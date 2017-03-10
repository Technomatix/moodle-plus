'use strict';

import * as WebAPI from './WebAPI';

export const receiveTodoItems = items => ({
    type: 'RECEIVE_TODO_ITEMS',
    items
});

export const toggleDone = item => ({
    type: 'TOGGLE_DONE',
    item
});

export const toggleDoneThunk = item => dispatch => {
    dispatch(toggleDone(item));
    WebAPI.putItem(item, (error, response) => {
        dispatch(receiveTodoItems(error ? [] : response.body));
    });
};
