'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ItemList from './ItemList';
import ItemForm from './ItemForm';
import * as actionCreators from '../actionCreators';
import * as thunks from '../thunks';

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
    items: PropTypes.arrayOf(PropTypes.object),
    form: PropTypes.object,
    toggleDoneThunk: PropTypes.func,
    setFormDueDate: PropTypes.func,
    setFormTaskDescription: PropTypes.func,
    addItemThunk: PropTypes.func,
    deleteItemThunk: PropTypes.func
};

const mapStateToProps = ({items, form}) => ({
    items,
    form
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleDoneThunk: thunks.toggleDoneThunk,
    setFormDueDate: actionCreators.setFormDueDate,
    setFormTaskDescription: actionCreators.setFormTaskDescription,
    addItemThunk: thunks.addItemThunk,
    deleteItemThunk: thunks.deleteItemThunk
}, dispatch);

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
