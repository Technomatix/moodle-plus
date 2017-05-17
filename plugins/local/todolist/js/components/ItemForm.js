'use strict';

import React from 'react';

import {isValidDate, getLangString} from '../lib';

/**
 * a form for adding a new item
 * @param {object} form
 * @param {function} setFormDueDate
 * @param {function} setFormTaskDescription
 * @param {function} addItemThunk
 * @returns {XML}
 */
export default ({form, setFormDueDate, setFormTaskDescription, addItemThunk}) => (
    <div className="card card-block">
        <h4 className="card-title">{getLangString('add_item')}</h4>
        <form>
            <div className="form-group">
                <label htmlFor="due">{getLangString('due')}</label>
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
                <label htmlFor="description">{getLangString('description')}</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder={getLangString('type_task_desc_here')}
                    value={form.taskDescription}
                    onChange={e => setFormTaskDescription(e.target.value)}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => addItemThunk()}
                disabled={!isValidDate(form.dueDate) || form.taskDescription.length === 0}
            >{getLangString('save')}</button>
        </form>
    </div>
);
