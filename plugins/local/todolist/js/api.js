'use strict';

import request from 'superagent';

import {dateFromString} from './lib';

/**
 * puts one item
 * @param {object} item
 * @param {function} cb
 */
export const putItem = (item, cb) => {
    request.put('item/')
        .type('application/json')
        .accept('application/json')
        .send({
            id: item.id,
            task_description: item.taskDescription,
            is_done: item.isDone ? 1 : 0,
            due_timestamp: parseInt(item.dueDate.getTime() / 1000)
        })
        .end(cb);
};

/**
 * posts one item
 * @param {string} dueDate
 * @param {string} taskDescription
 * @param {function} cb
 */
export const postItem = (dueDate, taskDescription, cb) => {
    request.post('item/')
        .type('application/json')
        .accept('application/json')
        .send({
            task_description: taskDescription,
            due_timestamp: parseInt(dateFromString(dueDate).getTime() / 1000)
        })
        .end(cb);
};

/**
 * deletes one item
 * @param {object} item
 */
export const deleteItem = item => {
    request.delete('item/')
        .type('application/json')
        .accept('application/json')
        .send({id: item.id})
        .end();
};
