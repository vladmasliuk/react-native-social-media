import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userRe from './redux-reducers/userRe';
import dataRe from './redux-reducers/dataRe';
import uiRe from './redux-reducers/uiRe';

const initState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userRe,
    data: dataRe,
    UI: uiRe
});

const store = createStore(reducers, initState, compose(applyMiddleware(...middleware)));

export default store;