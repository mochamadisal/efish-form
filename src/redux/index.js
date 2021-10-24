/* eslint-disable require-jsdoc */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export default function configureStore() {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

