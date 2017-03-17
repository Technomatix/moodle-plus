'use strict';

import clone from 'clone';

import * as WebAPI from './WebAPI';
import * as actionCreators from './actionCreators';

export const toggleDoneThunk = item => dispatch => {
    dispatch(actionCreators.toggleDone(item));
    const i = clone(item);
    i.isDone = !i.isDone;
    WebAPI.putItem(i, (error, response) => {
        dispatch(error ? actionCreators.toggleDone(item) : actionCreators.receiveItem(response.body));
    });
};

export const addItemThunk = () => (dispatch, getState) => {
    const dueDate = getState().form.dueDate;
    const taskDescription = getState().form.taskDescription;
    dispatch(actionCreators.optimisticallyAddItem(dueDate, taskDescription));
    WebAPI.postItem(dueDate, taskDescription, (error, response) => {
        if (!error) {
            dispatch(actionCreators.receiveItem(response.body));
        }
        dispatch(actionCreators.removeOptimisticallyAddedItems());
    });
};

export const deleteItemThunk = item => dispatch => {
    dispatch(actionCreators.deleteItem(item));
    WebAPI.deleteItem(item);
};
