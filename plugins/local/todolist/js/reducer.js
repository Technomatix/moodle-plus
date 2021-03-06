'use strict';

import clone from 'clone';

import {dateFromString} from './lib';

/**
 * @param {object} state
 * @param {object[]} items
 * @returns {object}
 */
const setInitialState = (state, items) => {
    const newState = {};
    newState.items = items.map(item => ({
        id: parseInt(item.id),
        taskDescription: item.task_description,
        isDone: item.is_done === '1',
        dueDate: new Date(parseInt(item.due_timestamp) * 1000)
    }));
    newState.form = {
        id: -1,
        taskDescription: '',
        isDone: false,
        dueDate: ''
    };
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
const receiveItem = (state, item) => {
    const newState = clone(state);
    let newItem = newState.items.find(i => i.id === parseInt(item.id));
    if (typeof newItem === 'undefined') {
        newItem = newState.items[newState.items.length - 1];
        newItem.id = parseInt(item.id);
    }
    newItem.taskDescription = item.task_description;
    newItem.isDone = item.is_done === '1';
    newItem.dueDate = new Date(parseInt(item.due_timestamp) * 1000);
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
const toggleDone = (state, item) => {
    const newState = clone(state);
    const newItem = newState.items.find(i => i.id === item.id);
    if (typeof newItem !== 'undefined') {
        newItem.isDone = !newItem.isDone;
    }
    return newState;
};

/**
 * @param {object} state
 * @param {string} dueDate
 * @returns {object}
 */
const setFormDueDate = (state, dueDate) => {
    const newState = clone(state);
    newState.form.dueDate = dueDate;
    return newState;
};

/**
 * @param {object} state
 * @param {string} taskDescription
 * @returns {object}
 */
const setFormTaskDescription = (state, taskDescription) => {
    const newState = clone(state);
    newState.form.taskDescription = taskDescription;
    return newState;
};

/**
 * @param {object} state
 * @returns {object}
 */
const optimisticallyAddItem = state => {
    const newState = clone(state);
    const dueDate = dateFromString(newState.form.dueDate);
    newState.items.push({
        id: newState.form.id,
        taskDescription: newState.form.taskDescription,
        isDone: false,
        dueDate
    });
    newState.form = {
        id: newState.form.id - 1,
        taskDescription: '',
        isDone: false,
        dueDate: ''
    };
    return newState;
};

/**
 * @param {object} state
 * @returns {object}
 */
const removeOptimisticallyAddedItems = state => {
    const newState = clone(state);
    newState.items = newState.items.filter(i => i.id > 0);
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
const deleteItem = (state, item) => {
    const newState = clone(state);
    newState.items = newState.items.filter(i => i.id !== item.id);
    return newState;
};

/**
 * the reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export default (state = {}, action = {}) => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return setInitialState(state, action.items);
        case 'RECEIVE_ITEM':
            return receiveItem(state, action.item);
        case 'TOGGLE_DONE':
            return toggleDone(state, action.item);
        case 'SET_FORM_DUE_DATE':
            return setFormDueDate(state, action.dueDate);
        case 'SET_FORM_TASK_DESCRIPTION':
            return setFormTaskDescription(state, action.taskDescription);
        case 'OPTIMISTICALLY_ADD_ITEM':
            return optimisticallyAddItem(state);
        case 'REMOVE_OPTIMISTICALLY_ADDED_ITEMS':
            return removeOptimisticallyAddedItems(state);
        case 'DELETE_ITEM':
            return deleteItem(state, action.item);
    }
    return state;
};
