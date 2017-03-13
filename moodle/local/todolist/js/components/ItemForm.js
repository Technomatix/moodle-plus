'use strict';

import React from 'react';

/**
 * a form for adding a new item
 * @returns {XML}
 */
const ItemForm = () => (
    <div className="card card-block">
        <h4 className="card-title">Add item</h4>
        <form>
            <div className="form-group">
                <label htmlFor="due">Due</label>
                <input type="date" className="form-control" id="due"/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Type task description here"/>
            </div>
            <button type="button" className="btn btn-primary">Save</button>
        </form>
    </div>
);

ItemForm.propTypes = {
};

export default ItemForm;
