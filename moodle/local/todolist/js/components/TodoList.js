'use strict';

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

/**
 * React component for a TODO list
 * @param {object[]} items
 * @returns {XML}
 */
const TodoList = ({items}) => (
    <ul className="list-group">
        {_.map(items, item => (
            <a href="#"
                key={item.id}
                className={`list-group-item list-group-item-action list-group-item-${item.isDone ? 'success' : 'warning'}`}
            >{item.taskDescription}</a>
        ))}
    </ul>
);

TodoList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
};

export const TodoListContainer = connect(state => ({
    items: state.items
}))(TodoList);
