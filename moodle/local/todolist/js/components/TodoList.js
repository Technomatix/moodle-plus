'use strict';

import React from 'react';
import _ from 'lodash';

import Item from './Item';

/**
 * a TODO list
 * @param {object[]} items
 * @param {function} toggleDoneThunk
 * @returns {XML}
 */
const TodoList = ({items, toggleDoneThunk}) => (
    <div className="card">
        <div className="card-block">
            <h4 className="card-title">Items</h4>
            <ul className="list-group">
                {_.map(items, item => <Item key={item.id} item={item} toggleDone={toggleDoneThunk}/>)}
            </ul>
        </div>
    </div>
);

TodoList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    toggleDoneThunk: React.PropTypes.func,
};

export default TodoList;
