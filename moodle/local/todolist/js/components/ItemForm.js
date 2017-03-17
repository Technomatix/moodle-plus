'use strict';

import React from 'react';

import {isValidDate} from '../lib';

/**
 * a form for adding a new item
 * @param {object} form
 * @param {function} setFormDueDate
 * @param {function} setFormTaskDescription
 * @param {function} addItemThunk
 * @returns {XML}
 */
const ItemForm = ({form, setFormDueDate, setFormTaskDescription, addItemThunk}) => (
    <div className="card card-block">
        <h4 className="card-title">Add item</h4>
        <form>
            <div className="form-group">
                <label htmlFor="due">Due</label>
                <input
                    type="text"
                    className="form-control"
                    id="due"
                    placeholder="YYYY-MM-DD"
                    value={form.dueDate}
                    maxLength={'YYYY-MM-DD'.length}
                    onChange={e => setFormDueDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Type task description here"
                    value={form.taskDescription}
                    onChange={e => setFormTaskDescription(e.target.value)}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => addItemThunk()}
                disabled={!isValidDate(form.dueDate) || form.taskDescription.length === 0}
            >Save</button>
        </form>
    </div>
);

ItemForm.propTypes = {
    form: React.PropTypes.object,
    setFormDueDate: React.PropTypes.func,
    setFormTaskDescription: React.PropTypes.func,
    addItemThunk: React.PropTypes.func
};

export default ItemForm;
