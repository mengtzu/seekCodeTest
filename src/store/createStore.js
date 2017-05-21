import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import advertiserReducer from './reducers/advertiserReducer';
import productsReducer from './reducers/productsReducer';
import checkoutReducer from './reducers/checkoutReducer';


const rootReducer = combineReducers({
    advertiser: advertiserReducer,
    products: productsReducer,
    checkout: checkoutReducer,
    form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
