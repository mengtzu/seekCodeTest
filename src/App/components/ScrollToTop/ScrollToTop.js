import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//This gets around react router 4 removing scroll helpers before browsers are *really* ready for it
//Who knows, maybe you're looking at this on Firefox?
//Anyway, this is the only class-based component in the app, since it actually needs a lifecycle function
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)