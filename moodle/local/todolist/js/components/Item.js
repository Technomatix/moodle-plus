'use strict';

import React from 'react';

/**
 * a TODO list item
 * @param {object} item
 * @returns {XML}
 */
const Item = ({item}) => {
    const lgi = 'list-group-item';
    const dw = item.dueDate < new Date() ? 'danger' : 'warning';
    const cn = `${lgi} ${lgi}action ${lgi}-${item.isDone ? 'success' : dw}`;
    return (
        <a href="#"
            key={item.id}
            className={cn}
        >
            <span>Due {item.dueDate.toLocaleDateString()}: </span>
            <span>{item.taskDescription}</span>
        </a>
    );
};

Item.propTypes = {
    item: React.PropTypes.object
};

export default Item;
