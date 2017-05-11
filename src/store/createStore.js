import { createStore, combineReducers } from 'redux';

import advertiserReducer from './reducers/advertiserReducer';


const reducer = combineReducers({
    advertiser: advertiserReducer
});

const store = createStore(reducer);

export default store
