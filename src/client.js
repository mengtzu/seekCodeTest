import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScrollToTop from './App/components/ScrollToTop/ScrollToTop';

import store from './store/createStore';
import App from './App/App';

render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById("app"));
