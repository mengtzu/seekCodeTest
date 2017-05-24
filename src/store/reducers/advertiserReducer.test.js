import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';
import { AUTH_STATUS_UNAUTHENTICATED, AUTH_STATUS_AUTHENTICATED } from '../../shared/constants/loginStates';
import { AUTHENTICATE_ADVERTISER } from '../../App/screens/SignIn/actions/signInActions';
import { PAYMENT_CONFIRMED } from '../../App/screens/Checkout/actions/checkoutActions';
import advertiserReducer from './advertiserReducer';

it('Should provide initial state', () => {
    const expectedInitialState = {
        username: null,
        displayName: '',
        authenticationStatus: AUTH_STATUS_UNAUTHENTICATED,
        discounts: [],
        adStock: {}
    };
    expectedInitialState.adStock[CLASSIC] = 0;
    expectedInitialState.adStock[STANDOUT] = 0;
    expectedInitialState.adStock[PREMIUM] = 0;

    expect(advertiserReducer()).toEqual(expectedInitialState);
});

it('Should handle authentication', () => {
    const payload = {
        username: 'oorai',
        displayName: 'Oorai Academy',
        discounts: [{ type: 'A discount'}]
    };

    expect(advertiserReducer({}, {
        type: AUTHENTICATE_ADVERTISER,
        payload
    })).toMatchObject({
        authenticationStatus: AUTH_STATUS_AUTHENTICATED,
        ...payload
    });
});

it('Should handle purchase', () => {
    const initialState = {
        adStock: {}
    };
    initialState.adStock[CLASSIC] = 3;
    initialState.adStock[STANDOUT] = 2;
    initialState.adStock[PREMIUM] = 1;

    const payload = {};
    payload[CLASSIC] = { quantity: 5 };
    payload[STANDOUT] = { quantity: 55 };
    payload[PREMIUM] = { quantity: 555 };

    const adStock = advertiserReducer(initialState, {
        type: PAYMENT_CONFIRMED,
        payload
    }).adStock;

    expect(adStock[CLASSIC]).toEqual(8);
    expect(adStock[STANDOUT]).toEqual(57);
    expect(adStock[PREMIUM]).toEqual(556);
});