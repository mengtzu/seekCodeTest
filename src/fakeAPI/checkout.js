import { CLASSIC, STANDOUT, PREMIUM } from '../shared/constants/products';
import { calculateAdTypeSubtotal, calculateTotal } from '../shared/calculatePrice/calculatePrice';
import advertisers from './data/advertisers';
import products from './data/products';

export const getCartDetailsForCheckout = ({ user, quantities }) => {
    //No validation in internal implementation, since we're in the fake API
    //Likewise we're pretending it's fast and not doing the async stuff here

    const total = calculateTotal({
        discounts: advertisers[user].discounts,
        products,
        quantities
    });

    const cartDetails = {
        ...total
    };

    cartDetails[CLASSIC] = {
        quantity: quantities[CLASSIC].quantity,
        subTotal: calculateAdTypeSubtotal({
            adType: CLASSIC,
            quantity: quantities[CLASSIC].quantity,
            basePrice: products[CLASSIC].basePrice,
            discounts: advertisers[user].discounts
        }).subTotal
    };

    cartDetails[STANDOUT] = {
        quantity: quantities[STANDOUT].quantity,
        subTotal: calculateAdTypeSubtotal({
            adType: STANDOUT,
            quantity: quantities[STANDOUT].quantity,
            basePrice: products[STANDOUT].basePrice,
            discounts: advertisers[user].discounts
        }).subTotal
    };

    cartDetails[PREMIUM] = {
        quantity: quantities[PREMIUM].quantity,
        subTotal: calculateAdTypeSubtotal({
            adType: PREMIUM,
            quantity: quantities[PREMIUM].quantity,
            basePrice: products[PREMIUM].basePrice,
            discounts: advertisers[user].discounts
        }).subTotal
    };

    return cartDetails;
};
