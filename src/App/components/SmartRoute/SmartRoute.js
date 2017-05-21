import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const loggedIn = 'authenticated';  //TODO get this from common source

//This component helps us get around some limitations of react-router-4 without wiring up redial or complex auth
//If privateRoute is set, it will redirect unauthenticated users
//If onRouteEnter is set (must be a function that takes dispatch as a param), it will fire it on route transition
//(this is mostly useful for fetching data, as you would with redial)


const mapStateToProps = (state) => {
    return {
        authenticationStatus: state.advertiser.authenticationStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleRouteEnter: (onRouteEnter) => {
            onRouteEnter(dispatch);
        }
    };
};

const getRender = ({ privateRoute, onRouteEnter, handleRouteEnter, authenticationStatus, Component }) => {
    return (props) => {
        if (privateRoute && (authenticationStatus !== loggedIn)) {
            return (
                <Redirect to={{
                pathname: '/',
                state: { from: props.location }
              }}/>
            )
        } else {
            if (onRouteEnter) {
                handleRouteEnter(onRouteEnter);
            }

            return (
                <Component {...props}/>
            )
        }
    }
};

const SmartRoute = ({ privateRoute, onRouteEnter, handleRouteEnter, component: Component, authenticationStatus, ...rest }) => {
    return (
        <Route {...rest} render={getRender({ privateRoute, onRouteEnter, handleRouteEnter, authenticationStatus, Component })}/>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(SmartRoute);