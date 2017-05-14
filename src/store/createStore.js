import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import advertiserReducer from './reducers/advertiserReducer';


const rootReducer = combineReducers({
    advertiser: advertiserReducer,
    form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store
