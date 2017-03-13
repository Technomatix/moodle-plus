'use strict';

import _ from 'lodash';
import * as WebAPI from './WebAPI';

export const setInitialState = items => ({
    type: 'SET_INITIAL_STATE',
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

export const setFormDueDate = dueDate => ({
    type: 'SET_FORM_DUE_DATE',
    dueDate
});

export const setFormTaskDescription = taskDescription => ({
    type: 'SET_FORM_TASK_DESCRIPTION',
    taskDescription
});

export const optimisticallyAddItem = (dueDate, taskDescription) => ({
    type: 'OPTIMISTICALLY_ADD_ITEM',
    dueDate,
    taskDescription
});

export const removeOptimisticallyAddedItems = () => ({
    type: 'REMOVE_OPTIMISTICALLY_ADDED_ITEMS'
});

export const toggleDoneThunk = item => dispatch => {
    dispatch(toggleDone(item));
    const i = _.cloneDeep(item);
    i.isDone = !i.isDone;
    WebAPI.putItem(i, (error, response) => {
        dispatch(error ? toggleDone(item) : receiveTodoItem(response.body));
    });
};

export const addItemThunk = () => (dispatch, getState) => {
    const dueDate = getState().form.dueDate;
    const taskDescription = getState().form.taskDescription;
    dispatch(optimisticallyAddItem(dueDate, taskDescription));
    /*
    WebAPI.postItem(dueDate, taskDescription, (error, response) => {
        dispatch(error ? dispatch(removeOptimisticallyAddedItems()) : receiveTodoItem(response.body));
    });
    */
};
