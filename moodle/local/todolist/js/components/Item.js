'use strict';

import React from 'react';

/**
 * a TODO list item
 * @param {object} item
 * @param {function} toggleDoneThunk
 * @returns {XML}
 */
const Item = ({item, toggleDoneThunk}) => {
    const lgi = 'list-group-item';
    const dw = item.dueDate < new Date() ? 'danger' : 'warning';
    const cn = `${lgi} ${lgi}-${item.isDone ? 'success' : dw}`;
    const tx = item.isDone ? 'Done' : `Due ${item.dueDate.toLocaleDateString()}`;
    return (
        <li key={item.id} className={cn}>
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isDone}
                    onChange={() => toggleDoneThunk(item)}
                    disabled={item.id < 0}
                />
                <span> {tx}: {item.taskDescription}</span>
            </label>
        </li>
    );
};

Item.propTypes = {
    item: React.PropTypes.object,
    toggleDoneThunk: React.PropTypes.func
};

export default Item;
