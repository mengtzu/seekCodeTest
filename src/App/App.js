import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import {
    StyleGuideProvider,
    Header,
    Footer
} from 'seek-style-guide/react'

import SignIn from './screens/SignIn/SignIn';

const mapStateToProps = (state) => {
    return {
        userName: state.advertiser.displayName,
        authenticationStatus: state.advertiser.authenticationStatus
    }
}

const App = (props) => {
    return (
        <StyleGuideProvider>
            <div>
                <Header
                    authenticationStatus={props.authenticationStatus}
                    userName={props.userName}
                />
                    <Route exact path="/" component={SignIn} />
                <Footer />
            </div>
        </StyleGuideProvider>
    )
};

export default connect(mapStateToProps)(App)