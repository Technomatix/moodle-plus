'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import {setInitialState} from './actionCreators';
import {AppContainer} from './components/App';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setInitialState(JSON.parse(document.querySelector('.todolist-items').innerHTML)));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>,
        document.querySelector('div[role="main"]')
    );
};

const waitForLangStrings = () => {
    if (typeof M !== 'undefined' && typeof M.util !== 'undefined' && typeof M.util.get_string === 'function') {
        render();
    } else {
        setTimeout(waitForLangStrings, 100);
    }
};

setTimeout(waitForLangStrings, 100);
