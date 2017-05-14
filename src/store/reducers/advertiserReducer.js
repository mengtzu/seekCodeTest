import { AUTHENTICATE_ADVERTISER } from '../../App/screens/SignIn/actions/signInActions';

const AUTH_STATUS_UNAUTHENTICATED = 'pending'; //'unauthenticated' exposes the real SEEK login, don't want that!
const AUTH_STATUS_AUTHENTICATED = 'authenticated';

const initialState = {
    username: null,
    displayName: '',
    authenticationStatus: AUTH_STATUS_UNAUTHENTICATED,
    discounts: []
};

const advertiserReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case AUTHENTICATE_ADVERTISER:
            return {
                ...state,
                username: action.payload.username,
                displayName: action.payload.displayName,
                authenticationStatus: AUTH_STATUS_AUTHENTICATED,
                discounts: action.payload.discounts
            };
            break;
        default:
            return state;
    }
};

export default advertiserReducer;
