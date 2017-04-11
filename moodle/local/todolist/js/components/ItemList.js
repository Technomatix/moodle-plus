'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';
import {getLangString} from './../lib';

/**
 * a TODO list
 * @param {object[]} items
 * @param {function} toggleDoneThunk
 * @param {function} deleteItemThunk
 * @returns {XML}
 */
const ItemList = ({items, toggleDoneThunk, deleteItemThunk}) => (
    <div className="card">
        <div className="card-block">
            <h4 className="card-title">{getLangString('items')}</h4>
            <ul className="list-group">
                {items.map(item => (
                    <Item key={item.id} item={item} toggleDoneThunk={toggleDoneThunk} deleteItemThunk={deleteItemThunk}/>
                ))}
            </ul>
        </div>
    </div>
);

ItemList.propTypes = {
    items: PropTypes.array,
    toggleDoneThunk: PropTypes.func,
    deleteItemThunk: PropTypes.func,
};

export default ItemList;
