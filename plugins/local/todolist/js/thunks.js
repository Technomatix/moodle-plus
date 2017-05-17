'use strict';

import clone from 'clone';

import * as api from './api';
import * as actionCreators from './actionCreators';

/**
 * toggles the 'done' status of the given item
 * @param {object} item
 * @returns {function}
 */
export const toggleDoneThunk = item => dispatch => {
    dispatch(actionCreators.toggleDone(item));
    const i = clone(item);
    i.isDone = !i.isDone;
    api.putItem(i, (error, response) => {
        dispatch(error ? actionCreators.toggleDone(item) : actionCreators.receiveItem(response.body));
    });
};

/**
 * adds the item from the form to the collection
 * @returns {function}
 */
export const addItemThunk = () => (dispatch, getState) => {
    const dueDate = getState().form.dueDate;
    const taskDescription = getState().form.taskDescription;
    dispatch(actionCreators.optimisticallyAddItem(dueDate, taskDescription));
    api.postItem(dueDate, taskDescription, (error, response) => {
        if (!error) {
            dispatch(actionCreators.receiveItem(response.body));
        }
        dispatch(actionCreators.removeOptimisticallyAddedItems());
    });
};

/**
 * deletes the given item
 * @param {object} item
 * @returns {function}
 */
export const deleteItemThunk = item => dispatch => {
    dispatch(actionCreators.deleteItem(item));
    api.deleteItem(item);
};
