import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const loggedIn = 'authenticated';  //TODO get this from common source

const mapStateToProps = (state) => {
    return {
        authenticationStatus: state.advertiser.authenticationStatus
    };
};

const ProtectedRoute = ({ component: Component, authenticationStatus, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            (authenticationStatus === loggedIn) ? (
              <Component {...props}/>
            ) : (
              <Redirect to={{
                pathname: '/',
                state: { from: props.location }
              }}/>
            )
        )}/>
    )
};

export default connect(mapStateToProps)(ProtectedRoute);