'use strict';

import React from 'react';

import {currentDate} from './../lib';

/**
 * a TODO list item
 * @param {object} item
 * @param {function} toggleDoneThunk
 * @param {function} deleteItemThunk
 * @returns {XML}
 */
const Item = ({item, toggleDoneThunk, deleteItemThunk}) => {
    const listGroupItem = 'list-group-item';
    const overdue = item.dueDate < currentDate() ? 'danger' : 'warning';
    const liClassName = `${listGroupItem} ${listGroupItem}-${item.isDone ? 'success' : overdue}`;
    const btClassName = `btn btn-danger btn-sm${item.isDone ? '' : ' disabled'}`;
    const text = item.isDone ? 'Done' : `Due ${item.dueDate.toLocaleDateString()}`;
    const style = {
        position: 'absolute',
        right: '20px'
    };
    return (
        <li key={item.id} className={liClassName}>
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isDone}
                    onChange={() => toggleDoneThunk(item)}
                    disabled={item.id < 0}
                />
                <span> {text}: {item.taskDescription}</span>
                <a
                    href="#"
                    className={btClassName}
                    style={style}
                    onClick={() => deleteItemThunk(item)}
                >Delete</a>
            </label>
        </li>
    );
};

Item.propTypes = {
    item: React.PropTypes.object,
    toggleDoneThunk: React.PropTypes.func,
    deleteItemThunk: React.PropTypes.func
};

export default Item;
