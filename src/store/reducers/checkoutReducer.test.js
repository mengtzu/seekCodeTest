import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';
import { GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS } from '../../App/screens/AdPacks/actions/adPackActions';
import { PAYMENT_BEGIN, REINITIALISE_CART } from '../../App/screens/Checkout/actions/checkoutActions';
import checkoutReducer from './checkoutReducer';

const initialState = {
    subTotal: 0,
    gst: 0,
    grandTotal: 0,
    paying: false
};

initialState[CLASSIC] = {
    quantity: 0,
    subTotal: 0
};

initialState[STANDOUT] = {
    quantity: 0,
    subTotal: 0
};

initialState[PREMIUM] = {
    quantity: 0,
    subTotal: 0
};

it('Should provide initial state', () => {
   expect(checkoutReducer()).toEqual(initialState);
});

it('Should handle card reinitialisation', () => {
   expect(checkoutReducer({
       ultimateCoolMoment: `The undefeated king sings aloud the name of the miracle she holds in her hands`
   }, {
       type: REINITIALISE_CART
   })).toEqual(initialState);
});

it('Should set flag on payment begin', () => {
    expect(checkoutReducer(initialState, {
        type: PAYMENT_BEGIN
    })).toEqual({
        ...initialState,
        paying: true
    })
});

it('Should accept cart details as computed by the API', () => {
    //This is another place where the app is a little more trusting of the "API" than it might be in real life
    //Since this one is what we display to the user for the actual payment step, it'd be a higher priority to
    //refactor for surety (even though we're *relatively* trusting of the API under the assumption we control it)
    //That would make this test probably only one of many

    const shoppingCart = {
        subTotal: 90,
        gst: 9,
        grandTotal: 99
    };
    shoppingCart[CLASSIC] = {
        quantity: 0,
        subTotal: 0
    };
    shoppingCart[STANDOUT] = {
        quantity: 4,
        subTotal: 40
    };
    shoppingCart[STANDOUT] = {
        quantity: 5,
        subTotal: 50
    };

    expect(checkoutReducer(initialState, {
        type: GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS,
        payload: shoppingCart
    })).toEqual({
        ...initialState,
        ...shoppingCart
    });

});

