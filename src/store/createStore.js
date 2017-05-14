import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import advertiserReducer from './reducers/advertiserReducer';


const rootReducer = combineReducers({
    advertiser: advertiserReducer,
    form: formReducer
});

const store = createStore(rootReducer);

export default store
