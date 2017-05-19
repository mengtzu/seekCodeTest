import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import {
    StyleGuideProvider,
    Footer
} from 'seek-style-guide/react'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header'
import SignIn from './screens/SignIn/SignIn';
import AdPacks from './screens/AdPacks/AdPacks';
import Checkout from './screens/Checkout/Checkout';
import Confirmation from './screens/Confirmation/Confirmation';
import FourOhFour from './screens/FourOhFour/FourOhFour';

const App = () => {
    return (
        <StyleGuideProvider>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <ProtectedRoute path="/adPacks" component={AdPacks} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/confirmation" component={Confirmation} />
                    <Route component={FourOhFour} />
                </Switch>
                <Footer />
            </div>
        </StyleGuideProvider>
    )
};

export default App;