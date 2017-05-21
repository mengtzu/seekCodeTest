import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';
import { GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS } from '../../App/screens/AdPacks/actions/adPackActions';

const initialState = {
    subTotal: 0,
    gst: 0,
    grandTotal: 0
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
        default:
            return state;
    }
};

export default checkoutReducer;