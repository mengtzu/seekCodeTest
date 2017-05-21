import { getProducts } from '../../../../fakeAPI/products';
import { getCartDetailsForCheckout } from '../../../../fakeAPI/checkout';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

export const GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS = 'GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS';

//We aren't bothering to make this really async, even though in reality it would be an api call hooked up through redial (et al)
//It's still worth maintaining this separation because you really, really want to get your prices from an API, not your code
export const getProductsData = (dispatch) => {
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: getProducts() });
};

export const goToCheckout = (values, user, history, dispatch) => {
    //This would normally be an async action that could have failure states
    //We can't just trust the frontend with money, we need our backend to generate transactions etc and start our paper trail
    //We're not bothering to implement that for the code test, but it'd look a bit like the error stuff implemented for signIn
    //We WILL still hit an API, it's just using exactly the same code to get the same prices ^_^

    const payload = getCartDetailsForCheckout({
        user,
        quantities: values
    });

    dispatch({ type: GET_CART_DETAILS_FOR_CHECKOUT_SUCCESS, payload });

    history.push(`/checkout`);
};