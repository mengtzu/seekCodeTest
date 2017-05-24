import React from 'react';
import { Checkout } from './Checkout';
import renderer from 'react-test-renderer';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../shared/constants/products';

const shoppingCart = {
    subTotal: 90,
    gst: 9,
    grandTotal: 99
};
shoppingCart[CLASSIC] = {
    quantity: 0,
    subTotal: 0
};
shoppingCart[STANDOUT] = {
    quantity: 4,
    subTotal: 40
};
shoppingCart[PREMIUM] = {
    quantity: 5,
    subTotal: 50
};

const advertiser = {
    displayName: 'Bentenmaru'
};

it('renders correctly', () => {
    const tree = renderer.create(
        <Checkout advertiser={advertiser} checkout={shoppingCart} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});