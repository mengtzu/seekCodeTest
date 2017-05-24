import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'seek-style-guide/react';

const mapStateToProps = (state) => {
    return {
        userName: state.advertiser.displayName,
        authenticationStatus: state.advertiser.authenticationStatus
    }
}

export const SeekStoreHeader = (props) => {
    return (
        <Header
            authenticationStatus={props.authenticationStatus}
            userName={props.userName}
        />
    );
}

export default connect(mapStateToProps)(SeekStoreHeader)