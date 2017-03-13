'use strict';

import React from 'react';
import {connect} from 'react-redux';

import TodoList from './TodoList';
import ItemForm from './ItemForm';
import * as actionCreators from '../actionCreators';

/**
 * the application
 * @param {object[]} items
 * @param {function} toggleDoneThunk
 * @returns {XML}
 */
const App = ({items, toggleDoneThunk}) => (
    <div>
        <TodoList items={items} toggleDoneThunk={toggleDoneThunk}/>
        <ItemForm/>
    </div>
);

App.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    toggleDoneThunk: React.PropTypes.func,
};

export const AppContainer = connect(state => ({
    items: state.items
}), actionCreators)(App);
