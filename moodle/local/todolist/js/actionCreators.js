'use strict';

export const setInitialState = items => ({
    type: 'SET_INITIAL_STATE',
    items
});

export const receiveItem = item => ({
    type: 'RECEIVE_ITEM',
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

export const deleteItem = item => ({
    type: 'DELETE_ITEM',
    item
});
