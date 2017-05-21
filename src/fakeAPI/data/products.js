import { CLASSIC, STANDOUT, PREMIUM } from '../../shared/constants/products';

let productsData = {};

//Bracket notation isn't necessarily preferred but here it lets us avoid having to iterate over this object in various places

productsData[CLASSIC] = {
    id: CLASSIC,
    basePrice: 269.99
};

productsData[STANDOUT] = {
    id: STANDOUT,
    basePrice: 322.99
};

productsData[PREMIUM] = {
    id: PREMIUM,
    basePrice: 394.99
}

export default productsData;