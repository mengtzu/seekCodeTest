import { GET_PRODUCTS_SUCCESS } from '../../App/screens/AdPacks/actions/adPackActions';
import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';
import productsReducer from './productsReducer';

it('Should handle product fetch success', () => {
    const payload = {};
    payload[CLASSIC] = `It's a classic!`;
    payload[STANDOUT] = { philosophy: `I am one with the Force, the Force is one with me` };
    payload[PREMIUM] = 42;
    payload.extraneousStuff = 'Pointless droid cameo';

    const expectedState = {};
    expectedState[CLASSIC] = payload[CLASSIC];
    expectedState[STANDOUT] = payload[STANDOUT];
    expectedState[PREMIUM] = payload[PREMIUM];

    expect(productsReducer({}, {
        type: GET_PRODUCTS_SUCCESS,
        payload
    })).toEqual(expectedState);

    //This test shows we are being super trusting of the API, even if we do cut extraneous stuff
    //Writing this test in real life would probably trigger a refactor - either better defaults here, or
    //duck-typing in the UI to save us from charging undefined for an ad
});
