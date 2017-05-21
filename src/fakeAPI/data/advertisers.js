import { DISCOUNT_TYPE_FLAT_RATE, DISCOUNT_TYPE_X_FOR_Y, DISCOUNT_TYPE_THRESHOLD } from '../../shared/constants/discounts';
import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';

//This abstracts a lot of stuff our theoretical API would be doing in constructing the discount objects we consume
//I find a lot of candidates try sophisticated approaches to the discount rules but in practice we'd make it
//as simple as possible for the frontend

export default {
    apple: {
        displayName: 'Apple',
        discounts: [{
            ad: STANDOUT,
            type: DISCOUNT_TYPE_FLAT_RATE,
            price: 299.99
        }]
    },
    ford: {
        displayName: 'Ford',
        discounts: [{
            ad: STANDOUT,
            type: DISCOUNT_TYPE_FLAT_RATE,
            price: 309.99
        }, {
            ad: CLASSIC,
            type: DISCOUNT_TYPE_X_FOR_Y,
            x: 5,
            y: 4
        }, {
            ad: PREMIUM,
            type: DISCOUNT_TYPE_THRESHOLD,
            threshold: 3,
            price: 389.99
        }]
    },
    nike: {
        displayName: 'Nike',
        discounts: [{
            ad: PREMIUM,
            type: DISCOUNT_TYPE_THRESHOLD,
            threshold: 3,
            price: 379.99
        }]
    },
    unilever: {
        displayName: 'Unilever',
        discounts: [{
            ad: CLASSIC,
            type: DISCOUNT_TYPE_X_FOR_Y,
            x: 3,
            y: 2
        }]
    },
    seek: {
        displayName: 'SEEK',
        discounts: []
    }
};
