'use strict';

import _ from 'lodash';

import {currentDate} from './lib';

/**
 * @param {object} state
 * @param {object[]} items
 * @returns {object}
 */
const setInitialState = (state, items) => {
    const newState = {};
    newState.items = _.map(items, item => ({
        id: parseInt(item.id),
        taskDescription: item.task_description,
        isDone: item.is_done === '1',
        dueDate: new Date(parseInt(item.due_timestamp) * 1000)
    }));
    newState.form = {
        id: -1,
        taskDescription: '',
        isDone: false,
        dueDate: currentDate()
    };
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
const receiveItem = (state, item) => {
    const newState = _.cloneDeep(state);
    let newItem = _.find(newState.items, i => i.id === parseInt(item.id));
    if (_.isUndefined(newItem)) {
        newItem = _.last(newState.items);
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
    const newState = _.cloneDeep(state);
    const newItem = _.find(newState.items, i => i.id === item.id);
    if (_.isObject(newItem)) {
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
    const newState = _.cloneDeep(state);
    newState.form.dueDate = _.size(dueDate) === 0 ? currentDate() : new Date(dueDate);
    return newState;
};

/**
 * @param {object} state
 * @param {string} taskDescription
 * @returns {object}
 */
const setFormTaskDescription = (state, taskDescription) => {
    const newState = _.cloneDeep(state);
    newState.form.taskDescription = taskDescription;
    return newState;
};

/**
 * @param {object} state
 * @returns {object}
 */
const optimisticallyAddItem = state => {
    const newState = _.cloneDeep(state);
    newState.items.push({
        id: newState.form.id,
        taskDescription: newState.form.taskDescription,
        isDone: false,
        dueDate: newState.form.dueDate
    });
    newState.form = {
        id: newState.form.id - 1,
        taskDescription: '',
        isDone: false,
        dueDate: currentDate()
    };
    return newState;
};

/**
 * @param {object} state
 * @returns {object}
 */
const removeOptimisticallyAddedItems = state => {
    const newState = _.cloneDeep(state);
    newState.items = _.filter(newState.items, i => i.id > 0);
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
const deleteItem = (state, item) => {
    const newState = _.cloneDeep(state);
    newState.items = _.filter(newState.items, i => i.id !== item.id);
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
