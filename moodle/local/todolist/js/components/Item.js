'use strict';

import React from 'react';

/**
 * a TODO list item
 * @param {object} item
 * @param {function} toggleDone
 * @returns {XML}
 */
const Item = ({item, toggleDone}) => {
    const lgi = 'list-group-item';
    const dw = item.dueDate < new Date() ? 'danger' : 'warning';
    const cn = `${lgi} ${lgi}action ${lgi}-${item.isDone ? 'success' : dw}`;
    return (
        <a href="#"
            key={item.id}
            className={cn}
            onClick={() => toggleDone(item)}
        >
            <span>Due {item.dueDate.toLocaleDateString()}: </span>
            <span>{item.taskDescription}</span>
        </a>
    );
};

Item.propTypes = {
    item: React.PropTypes.object,
    toggleDone: React.PropTypes.func
};

export default Item;
