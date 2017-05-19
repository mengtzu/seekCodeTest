import { getProducts } from '../../../../fakeAPI/products';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';

//We aren't bothering to make this really async, even though in reality it would be an api call hooked up through redial
//It's still worth maintaining this separation because you really, really want to get your prices from an API, not your code
export const getProductsData = (dispatch) => {
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: getProducts() });
};
