/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = vendor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(52);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * get current date
 * @return {Date}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var currentDate = exports.currentDate = function currentDate() {
  var d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * convert given date string in 'YYYY-MM-DD' format to a Date instance
 * @param {string} date
 * @return {Date}
 */
var dateFromString = exports.dateFromString = function dateFromString(date) {
  var bits = date.split('-').map(function (i) {
    return parseInt(i);
  });
  return new Date(Date.UTC(bits[0], bits[1] - 1, bits[2]));
};

/**
 * determine whether given date string in 'YYYY-MM-DD' format is valid
 * @param {string} date
 * @returns {boolean}
 */
var isValidDate = exports.isValidDate = function isValidDate(date) {
  if (date === null || date.length !== 'YYYY-MM-DD'.length) {
    return false;
  }
  return dateFromString(date).toISOString().substr(0, 'YYYY-MM-DD'.length) === date;
};

/**
 * get a Moodle language string that's been exported for JavaScript
 * @param {string} id
 * @returns {string}
 */
var getLangString = exports.getLangString = function getLangString(id) {
  return M.util.get_string('js:' + id, 'local_todolist');
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var setInitialState = exports.setInitialState = function setInitialState(items) {
    return {
        type: 'SET_INITIAL_STATE',
        items: items
    };
};

var receiveItem = exports.receiveItem = function receiveItem(item) {
    return {
        type: 'RECEIVE_ITEM',
        item: item
    };
};

var toggleDone = exports.toggleDone = function toggleDone(item) {
    return {
        type: 'TOGGLE_DONE',
        item: item
    };
};

var setFormDueDate = exports.setFormDueDate = function setFormDueDate(dueDate) {
    return {
        type: 'SET_FORM_DUE_DATE',
        dueDate: dueDate
    };
};

var setFormTaskDescription = exports.setFormTaskDescription = function setFormTaskDescription(taskDescription) {
    return {
        type: 'SET_FORM_TASK_DESCRIPTION',
        taskDescription: taskDescription
    };
};

var optimisticallyAddItem = exports.optimisticallyAddItem = function optimisticallyAddItem(dueDate, taskDescription) {
    return {
        type: 'OPTIMISTICALLY_ADD_ITEM',
        dueDate: dueDate,
        taskDescription: taskDescription
    };
};

var removeOptimisticallyAddedItems = exports.removeOptimisticallyAddedItems = function removeOptimisticallyAddedItems() {
    return {
        type: 'REMOVE_OPTIMISTICALLY_ADDED_ITEMS'
    };
};

var deleteItem = exports.deleteItem = function deleteItem(item) {
    return {
        type: 'DELETE_ITEM',
        item: item
    };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(207);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(94);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(99);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppContainer = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(4);

var _redux = __webpack_require__(5);

var _ItemList = __webpack_require__(15);

var _ItemList2 = _interopRequireDefault(_ItemList);

var _ItemForm = __webpack_require__(14);

var _ItemForm2 = _interopRequireDefault(_ItemForm);

var _actionCreators = __webpack_require__(3);

var actionCreators = _interopRequireWildcard(_actionCreators);

var _thunks = __webpack_require__(16);

var thunks = _interopRequireWildcard(_thunks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var App = function App(_ref) {
    var items = _ref.items,
        form = _ref.form,
        toggleDoneThunk = _ref.toggleDoneThunk,
        setFormDueDate = _ref.setFormDueDate,
        setFormTaskDescription = _ref.setFormTaskDescription,
        addItemThunk = _ref.addItemThunk,
        deleteItemThunk = _ref.deleteItemThunk;
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_ItemList2.default, {
            items: items,
            toggleDoneThunk: toggleDoneThunk,
            deleteItemThunk: deleteItemThunk
        }),
        _react2.default.createElement(_ItemForm2.default, {
            form: form,
            setFormDueDate: setFormDueDate,
            setFormTaskDescription: setFormTaskDescription,
            addItemThunk: addItemThunk
        })
    );
};

var mapStateToProps = function mapStateToProps(_ref2) {
    var items = _ref2.items,
        form = _ref2.form;
    return {
        items: items,
        form: form
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({
        toggleDoneThunk: thunks.toggleDoneThunk,
        setFormDueDate: actionCreators.setFormDueDate,
        setFormTaskDescription: actionCreators.setFormTaskDescription,
        addItemThunk: thunks.addItemThunk,
        deleteItemThunk: thunks.deleteItemThunk
    }, dispatch);
};

var AppContainer = exports.AppContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clone = __webpack_require__(6);

var _clone2 = _interopRequireDefault(_clone);

var _lib = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {object} state
 * @param {object[]} items
 * @returns {object}
 */
var setInitialState = function setInitialState(state, items) {
    var newState = {};
    newState.items = items.map(function (item) {
        return {
            id: parseInt(item.id),
            taskDescription: item.task_description,
            isDone: item.is_done === '1',
            dueDate: new Date(parseInt(item.due_timestamp) * 1000)
        };
    });
    newState.form = {
        id: -1,
        taskDescription: '',
        isDone: false,
        dueDate: ''
    };
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
var receiveItem = function receiveItem(state, item) {
    var newState = (0, _clone2.default)(state);
    var newItem = newState.items.find(function (i) {
        return i.id === parseInt(item.id);
    });
    if (typeof newItem === 'undefined') {
        newItem = newState.items[newState.items.length - 1];
        newItem.id = parseInt(item.id);
    }
    newItem.taskDescription = item.task_description;
    newItem.isDone = item.is_done === '1';
    newItem.dueDate = new Date(parseInt(item.due_timestamp) * 1000);
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
var toggleDone = function toggleDone(state, item) {
    var newState = (0, _clone2.default)(state);
    var newItem = newState.items.find(function (i) {
        return i.id === item.id;
    });
    if (typeof newItem !== 'undefined') {
        newItem.isDone = !newItem.isDone;
    }
    return newState;
};

/**
 * @param {object} state
 * @param {string} dueDate
 * @returns {object}
 */
var setFormDueDate = function setFormDueDate(state, dueDate) {
    var newState = (0, _clone2.default)(state);
    newState.form.dueDate = dueDate;
    return newState;
};

/**
 * @param {object} state
 * @param {string} taskDescription
 * @returns {object}
 */
var setFormTaskDescription = function setFormTaskDescription(state, taskDescription) {
    var newState = (0, _clone2.default)(state);
    newState.form.taskDescription = taskDescription;
    return newState;
};

/**
 * @param {object} state
 * @returns {object}
 */
var optimisticallyAddItem = function optimisticallyAddItem(state) {
    var newState = (0, _clone2.default)(state);
    var dueDate = (0, _lib.dateFromString)(newState.form.dueDate);
    newState.items.push({
        id: newState.form.id,
        taskDescription: newState.form.taskDescription,
        isDone: false,
        dueDate: dueDate
    });
    newState.form = {
        id: newState.form.id - 1,
        taskDescription: '',
        isDone: false,
        dueDate: ''
    };
    return newState;
};

/**
 * @param {object} state
 * @returns {object}
 */
var removeOptimisticallyAddedItems = function removeOptimisticallyAddedItems(state) {
    var newState = (0, _clone2.default)(state);
    newState.items = newState.items.filter(function (i) {
        return i.id > 0;
    });
    return newState;
};

/**
 * @param {object} state
 * @param {object} item
 * @returns {object}
 */
var deleteItem = function deleteItem(state, item) {
    var newState = (0, _clone2.default)(state);
    newState.items = newState.items.filter(function (i) {
        return i.id !== item.id;
    });
    return newState;
};

/**
 * the reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return setInitialState(state, action.items);
        case 'RECEIVE_ITEM':
            return receiveItem(state, action.item);
        case 'TOGGLE_DONE':
            return toggleDone(state, action.item);
        case 'SET_FORM_DUE_DATE':
            return setFormDueDate(state, action.dueDate);
        case 'SET_FORM_TASK_DESCRIPTION':
            return setFormTaskDescription(state, action.taskDescription);
        case 'OPTIMISTICALLY_ADD_ITEM':
            return optimisticallyAddItem(state);
        case 'REMOVE_OPTIMISTICALLY_ADDED_ITEMS':
            return removeOptimisticallyAddedItems(state);
        case 'DELETE_ITEM':
            return deleteItem(state, action.item);
    }
    return state;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(129);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(223);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteItem = exports.postItem = exports.putItem = undefined;

var _superagent = __webpack_require__(17);

var _superagent2 = _interopRequireDefault(_superagent);

var _lib = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * puts one item
 * @param {object} item
 * @param {function} cb
 */
var putItem = exports.putItem = function putItem(item, cb) {
    _superagent2.default.put('item/').type('application/json').accept('application/json').send({
        id: item.id,
        task_description: item.taskDescription,
        is_done: item.isDone ? 1 : 0,
        due_timestamp: parseInt(item.dueDate.getTime() / 1000)
    }).end(cb);
};

/**
 * posts one item
 * @param {string} dueDate
 * @param {string} taskDescription
 * @param {function} cb
 */
var postItem = exports.postItem = function postItem(dueDate, taskDescription, cb) {
    _superagent2.default.post('item/').type('application/json').accept('application/json').send({
        task_description: taskDescription,
        due_timestamp: parseInt((0, _lib.dateFromString)(dueDate).getTime() / 1000)
    }).end(cb);
};

/**
 * deletes one item
 * @param {object} item
 */
var deleteItem = exports.deleteItem = function deleteItem(item) {
    _superagent2.default.delete('item/').type('application/json').accept('application/json').send({ id: item.id }).end();
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(9);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(5);

var _reactRedux = __webpack_require__(4);

var _reduxThunk = __webpack_require__(10);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducer = __webpack_require__(8);

var _reducer2 = _interopRequireDefault(_reducer);

var _actionCreators = __webpack_require__(3);

var _App = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);
var store = createStoreWithMiddleware(_reducer2.default);
store.dispatch((0, _actionCreators.setInitialState)(JSON.parse(document.querySelector('.todolist-items').innerHTML)));

var render = function render() {
    _reactDom2.default.render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_App.AppContainer, null)
    ), document.querySelector('div[role="main"]'));
};

var waitForLangStrings = function waitForLangStrings() {
    if (typeof M !== 'undefined' && typeof M.util !== 'undefined' && typeof M.util.get_string === 'function') {
        render();
    } else {
        setTimeout(waitForLangStrings, 100);
    }
};

setTimeout(waitForLangStrings, 100);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lib = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * a TODO list item
 * @param {object} item
 * @param {function} toggleDoneThunk
 * @param {function} deleteItemThunk
 * @returns {XML}
 */
exports.default = function (_ref) {
    var item = _ref.item,
        toggleDoneThunk = _ref.toggleDoneThunk,
        deleteItemThunk = _ref.deleteItemThunk;

    var listGroupItem = 'list-group-item';
    var overdue = item.dueDate < (0, _lib.currentDate)() ? 'danger' : 'warning';
    var className = listGroupItem + ' ' + listGroupItem + '-' + (item.isDone ? 'success' : overdue);
    var text = item.isDone ? (0, _lib.getLangString)('done') : (0, _lib.getLangString)('due') + ' ' + item.dueDate.toUTCString().substr(0, 'Sun, 01 Jan 2017'.length);
    var style = {
        position: 'absolute',
        right: '20px'
    };
    return _react2.default.createElement(
        'li',
        { key: item.id, className: className },
        _react2.default.createElement(
            'label',
            { className: 'form-check-label' },
            _react2.default.createElement('input', {
                className: 'form-check-input',
                type: 'checkbox',
                name: 'mark',
                checked: item.isDone,
                onChange: function onChange() {
                    return toggleDoneThunk(item);
                },
                disabled: item.id < 0
            }),
            _react2.default.createElement(
                'span',
                null,
                ' ',
                text,
                ': ',
                item.taskDescription
            )
        ),
        _react2.default.createElement(
            'button',
            {
                className: 'btn btn-danger btn-sm',
                style: style,
                onClick: function onClick() {
                    return deleteItemThunk(item);
                },
                disabled: !item.isDone
            },
            (0, _lib.getLangString)('delete')
        )
    );
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lib = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * a form for adding a new item
 * @param {object} form
 * @param {function} setFormDueDate
 * @param {function} setFormTaskDescription
 * @param {function} addItemThunk
 * @returns {XML}
 */
exports.default = function (_ref) {
    var form = _ref.form,
        setFormDueDate = _ref.setFormDueDate,
        setFormTaskDescription = _ref.setFormTaskDescription,
        addItemThunk = _ref.addItemThunk;
    return _react2.default.createElement(
        'div',
        { className: 'card card-block' },
        _react2.default.createElement(
            'h4',
            { className: 'card-title' },
            (0, _lib.getLangString)('add_item')
        ),
        _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'due' },
                    (0, _lib.getLangString)('due')
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control',
                    id: 'due',
                    placeholder: 'YYYY-MM-DD',
                    value: form.dueDate,
                    maxLength: 'YYYY-MM-DD'.length,
                    onChange: function onChange(e) {
                        return setFormDueDate(e.target.value);
                    }
                })
            ),
            _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: 'description' },
                    (0, _lib.getLangString)('description')
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    className: 'form-control',
                    id: 'description',
                    placeholder: (0, _lib.getLangString)('type_task_desc_here'),
                    value: form.taskDescription,
                    onChange: function onChange(e) {
                        return setFormTaskDescription(e.target.value);
                    }
                })
            ),
            _react2.default.createElement(
                'button',
                {
                    type: 'button',
                    className: 'btn btn-primary',
                    onClick: function onClick() {
                        return addItemThunk();
                    },
                    disabled: !(0, _lib.isValidDate)(form.dueDate) || form.taskDescription.length === 0
                },
                (0, _lib.getLangString)('save')
            )
        )
    );
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Item = __webpack_require__(13);

var _Item2 = _interopRequireDefault(_Item);

var _lib = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * a TODO list
 * @param {object[]} items
 * @param {function} toggleDoneThunk
 * @param {function} deleteItemThunk
 * @returns {XML}
 */
exports.default = function (_ref) {
    var items = _ref.items,
        toggleDoneThunk = _ref.toggleDoneThunk,
        deleteItemThunk = _ref.deleteItemThunk;
    return _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(
            'div',
            { className: 'card-block' },
            _react2.default.createElement(
                'h4',
                { className: 'card-title' },
                (0, _lib.getLangString)('items')
            ),
            _react2.default.createElement(
                'ul',
                { className: 'list-group' },
                items.map(function (item) {
                    return _react2.default.createElement(_Item2.default, { key: item.id, item: item, toggleDoneThunk: toggleDoneThunk, deleteItemThunk: deleteItemThunk });
                })
            )
        )
    );
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteItemThunk = exports.addItemThunk = exports.toggleDoneThunk = undefined;

var _clone = __webpack_require__(6);

var _clone2 = _interopRequireDefault(_clone);

var _api = __webpack_require__(11);

var api = _interopRequireWildcard(_api);

var _actionCreators = __webpack_require__(3);

var actionCreators = _interopRequireWildcard(_actionCreators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * toggles the 'done' status of the given item
 * @param {object} item
 * @returns {function}
 */
var toggleDoneThunk = exports.toggleDoneThunk = function toggleDoneThunk(item) {
    return function (dispatch) {
        dispatch(actionCreators.toggleDone(item));
        var i = (0, _clone2.default)(item);
        i.isDone = !i.isDone;
        api.putItem(i, function (error, response) {
            dispatch(error ? actionCreators.toggleDone(item) : actionCreators.receiveItem(response.body));
        });
    };
};

/**
 * adds the item from the form to the collection
 * @returns {function}
 */
var addItemThunk = exports.addItemThunk = function addItemThunk() {
    return function (dispatch, getState) {
        var dueDate = getState().form.dueDate;
        var taskDescription = getState().form.taskDescription;
        dispatch(actionCreators.optimisticallyAddItem(dueDate, taskDescription));
        api.postItem(dueDate, taskDescription, function (error, response) {
            if (!error) {
                dispatch(actionCreators.receiveItem(response.body));
            }
            dispatch(actionCreators.removeOptimisticallyAddedItems());
        });
    };
};

/**
 * deletes the given item
 * @param {object} item
 * @returns {function}
 */
var deleteItemThunk = exports.deleteItemThunk = function deleteItemThunk(item) {
    return function (dispatch) {
        dispatch(actionCreators.deleteItem(item));
        api.deleteItem(item);
    };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(227);

/***/ })
/******/ ]);
//# sourceMappingURL=todolist.js.map