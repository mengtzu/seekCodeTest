import { GET_PRODUCTS_SUCCESS } from '../../App/screens/AdPacks/actions/adPackActions';

//I would probably hardcode the product types even in the real app (and actually...I did!  Along with others)
//The products have a lot of bespoke presentation and UI, it's not worth overengineering flexibility for them
//We won't hard code their prices though, even in a code test that makes me twitch :)
const initialState = {
    classic: {},
    standout: {},
    premium: {}
};


const productsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                classic: action.payload.classic,
                standout: action.payload.standout,
                premium: action.payload.premium
            };
            break;
        default:
            return state;
    }
};

export default productsReducer;