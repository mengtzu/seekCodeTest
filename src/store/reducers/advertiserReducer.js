const AUTH_STATUS_UNAUTHENTICATED = 'pending'; //'unauthenticated' exposes the real SEEK login, don't want that!
const AUTH_STATUS_AUTHENTICATED = 'authenticated';

const initialState = {
    displayName: '',
    authenticationStatus: AUTH_STATUS_UNAUTHENTICATED
};

const advertiserReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default advertiserReducer;
