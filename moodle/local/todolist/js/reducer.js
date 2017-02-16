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
        isDone: item.is_done === '1'
    }));
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
    }
    return state;
};
