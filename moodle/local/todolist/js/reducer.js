'use strict';

import _ from 'lodash';

/**
 * @param {object} state
 * @param {object[]} items
 * @returns {object}
 */
const receiveTodoItems = (state, items) => {
    const newState = _.cloneDeep(state);
    newState.items = _.map(items, item => ({
        id: parseInt(item.id),
        taskDescription: item.task_description,
        isDone: item.is_done === '1',
        dueDate: new Date(parseInt(item.due_timestamp) * 1000)
    }));
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
    newItem.isDone = !newItem.isDone;
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
        case 'RECEIVE_TODO_ITEMS':
            return receiveTodoItems(state, action.items);
        case 'TOGGLE_DONE':
            return toggleDone(state, action.item);
    }
    return state;
};
