'use strict';

import React from 'react';

import {currentDate, getLangString} from './../lib';

/**
 * a TODO list item
 * @param {object} item
 * @param {function} toggleDoneThunk
 * @param {function} deleteItemThunk
 * @returns {XML}
 */
export default ({item, toggleDoneThunk, deleteItemThunk}) => {
    const listGroupItem = 'list-group-item';
    const overdue = item.dueDate < currentDate() ? 'danger' : 'warning';
    const className = `${listGroupItem} ${listGroupItem}-${item.isDone ? 'success' : overdue}`;
    const text = item.isDone ? getLangString('done')
        : `${getLangString('due')} ${item.dueDate.toUTCString().substr(0, 'Sun, 01 Jan 2017'.length)}`;
    const style = {
        position: 'absolute',
        right: '20px'
    };
    return (
        <li key={item.id} className={className}>
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    name="mark"
                    checked={item.isDone}
                    onChange={() => toggleDoneThunk(item)}
                    disabled={item.id < 0}
                />
                <span> {text}: {item.taskDescription}</span>
            </label>
            <button
                className="btn btn-danger btn-sm"
                style={style}
                onClick={() => deleteItemThunk(item)}
                disabled={!item.isDone}
            >{getLangString('delete')}</button>
        </li>
    );
};
