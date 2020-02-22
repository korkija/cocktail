import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {cocktails} from '../reducers/cocktails';
const reducers=combineReducers({cocktails});

export const store=createStore(reducers,applyMiddleware(thunk));
