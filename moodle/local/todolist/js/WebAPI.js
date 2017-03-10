'use strict';

import request from 'superagent';

/**
 * puts one item
 * @param {object} item
 * @param {function} cb
 */
export function putItem(item, cb) {
    request.put('item/')
        .type('application/json')
        .accept('application/json')
        .send(item)
        .end(cb);
}
