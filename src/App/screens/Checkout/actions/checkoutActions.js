import payment from '../../../../fakeAPI/payment';
import { routes } from '../../../constants/routes';

export const PAYMENT_BEGIN = 'PAYMENT_BEGIN';
export const PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED';
export const REINITIALISE_CART = 'REINITIALISE_CART';


//In reality this would involve messing around with payment providers etc
export const completePayment = (dispatch, history, quantities) => {
    dispatch({ type: PAYMENT_BEGIN });
    return payment().then(() => {
        history.push(routes.confirmation); //has to be before dispatch, we're messing with props checkout needs
        dispatch({ type: PAYMENT_CONFIRMED, payload: quantities });
        dispatch({ type: REINITIALISE_CART });  //has to be last or quantities gets wiped
    });
};
