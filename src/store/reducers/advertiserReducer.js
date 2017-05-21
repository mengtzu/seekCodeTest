import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';
import { AUTHENTICATE_ADVERTISER } from '../../App/screens/SignIn/actions/signInActions';
import { PAYMENT_CONFIRMED } from '../../App/screens/Checkout/actions/checkoutActions';

const AUTH_STATUS_UNAUTHENTICATED = 'pending'; //'unauthenticated' exposes the real SEEK login, don't want that!
const AUTH_STATUS_AUTHENTICATED = 'authenticated';

const initialState = {
    username: null,
    displayName: '',
    authenticationStatus: AUTH_STATUS_UNAUTHENTICATED,
    discounts: [],
    adStock: {}
};

initialState.adStock[CLASSIC] = 0;
initialState.adStock[STANDOUT] = 0;
initialState.adStock[PREMIUM] = 0;

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
        case PAYMENT_CONFIRMED:
            const adStock = {};
            adStock[CLASSIC] = state.adStock[CLASSIC] + parseInt(action.payload[CLASSIC].quantity);
            adStock[STANDOUT] = state.adStock[STANDOUT] + parseInt(action.payload[STANDOUT].quantity);
            adStock[PREMIUM] = state.adStock[PREMIUM] + parseInt(action.payload[PREMIUM].quantity);

            return {
                ...state,
                adStock
            };
            break;
        default:
            return state;
    }
};

export default advertiserReducer;
