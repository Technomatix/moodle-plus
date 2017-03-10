'use strict';

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Item from './Item';
import ItemForm from './ItemForm';
import * as actionCreators from '../actionCreators';

/**
 * a TODO list
 * @param {object[]} items
 * @param {function} toggleDoneThunk
 * @returns {XML}
 */
const TodoList = ({items, toggleDoneThunk}) => (
    <div>
        <ul className="list-group">
            {_.map(items, item => <Item key={item.id} item={item} toggleDone={toggleDoneThunk}/>)}
        </ul>
        <ItemForm/>
    </div>
);

TodoList.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    toggleDoneThunk: React.PropTypes.func,
};

export const TodoListContainer = connect(state => ({
    items: state.items
}), actionCreators)(TodoList);
