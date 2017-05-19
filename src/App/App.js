import React from 'react';
import { Route, Switch } from 'react-router-dom'
import {
    StyleGuideProvider,
    Footer
} from 'seek-style-guide/react'

import { getProductsData } from './screens/AdPacks/actions/adPackActions';
import SmartRoute from './components/SmartRoute/SmartRoute';
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
                    <SmartRoute protectedRoute={true} path="/adPacks" component={AdPacks} onRouteEnter={getProductsData} />
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