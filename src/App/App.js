import React from 'react';
import { Route, Switch } from 'react-router-dom'
import {
    StyleGuideProvider,
    Footer
} from 'seek-style-guide/react'

import Header from './components/Header/Header'
import SignIn from './screens/SignIn/SignIn';
import AdPacks from './screens/AdPacks/AdPacks';
import FourOhFour from './screens/FourOhFour/FourOhFour';

const App = () => {
    return (
        <StyleGuideProvider>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/adPacks" component={AdPacks} />
                    <Route component={FourOhFour} />
                </Switch>
                <Footer />
            </div>
        </StyleGuideProvider>
    )
};

export default App;