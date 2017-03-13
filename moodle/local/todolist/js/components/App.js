'use strict';

import React from 'react';
import {connect} from 'react-redux';

import ItemList from './ItemList';
import ItemForm from './ItemForm';
import * as actionCreators from '../actionCreators';

/**
 * the application
 * @param {object[]} items
 * @param {object} form
 * @param {function} toggleDoneThunk
 * @param {function} setFormDueDate
 * @param {function} setFormTaskDescription
 * @param {function} addItemThunk
 * @param {function} deleteItemThunk
 * @returns {XML}
 */
const App = ({items, form, toggleDoneThunk, setFormDueDate, setFormTaskDescription, addItemThunk, deleteItemThunk}) => (
    <div>
        <ItemList
            items={items}
            toggleDoneThunk={toggleDoneThunk}
            deleteItemThunk={deleteItemThunk}
        />
        <ItemForm
            form={form}
            setFormDueDate={setFormDueDate}
            setFormTaskDescription={setFormTaskDescription}
            addItemThunk={addItemThunk}
        />
    </div>
);

App.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    form: React.PropTypes.object,
    toggleDoneThunk: React.PropTypes.func,
    setFormDueDate: React.PropTypes.func,
    setFormTaskDescription: React.PropTypes.func,
    addItemThunk: React.PropTypes.func,
    deleteItemThunk: React.PropTypes.func
};

export const AppContainer = connect(state => ({
    items: state.items,
    form: state.form
}), actionCreators)(App);
