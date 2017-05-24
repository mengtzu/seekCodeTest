import { GET_PRODUCTS_SUCCESS } from '../../App/screens/AdPacks/actions/adPackActions';
import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';

//I would probably hardcode the product types even in the real app (and actually...I did!  Along with others)
//The products have a lot of bespoke presentation and UI, it's not worth overengineering flexibility for them
//We won't hard code their prices though, even in a code test that makes me twitch :)
const initialState = {};
initialState[CLASSIC] = {};
initialState[STANDOUT] = {};
initialState[PREMIUM] = {};

const productsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case GET_PRODUCTS_SUCCESS:
            const payloadState = {};
            payloadState[CLASSIC] = action.payload[CLASSIC];
            payloadState[STANDOUT] = action.payload[STANDOUT];
            payloadState[PREMIUM] = action.payload[PREMIUM];

            return {
                ...state,
                ...payloadState
            };
            break;
        default:
            return state;
    }
};

export default productsReducer;