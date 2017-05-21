import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';
import { GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS } from '../../App/screens/AdPacks/actions/adPackActions';
import { PAYMENT_BEGIN, REINITIALISE_CART } from '../../App/screens/Checkout/actions/checkoutActions';


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

const checkoutReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
            break;
        case PAYMENT_BEGIN:
            return {
                ...state,
                paying: true
            };
            break;
        case REINITIALISE_CART:
            return {
                ...initialState
            };
            break;
        default:
            return state;
    }
};

export default checkoutReducer;