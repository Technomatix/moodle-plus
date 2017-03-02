'use strict';

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Item from './Item';

/**
 * a TODO list
 * @param {object[]} items
 * @returns {XML}
 */
const TodoList = ({items}) => (
    <ul className="list-group">
        {_.map(items, item => <Item key={item.id} item={item}/>)}
    </ul>
);

TodoList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
};

export const TodoListContainer = connect(state => ({
    items: state.items
}))(TodoList);
