import React from 'react';
import { AdPacksTotal } from './AdPacksTotal';
import renderer from 'react-test-renderer';

import { DISCOUNT_TYPE_FLAT_RATE, DISCOUNT_TYPE_X_FOR_Y, DISCOUNT_TYPE_THRESHOLD } from '../../../../../shared/constants/discounts';
import { CLASSIC, STANDOUT, PREMIUM } from '../../../../../shared/constants/products';

const mockDiscounts = [{
    type: DISCOUNT_TYPE_FLAT_RATE,
    ad: CLASSIC,
    price: 199.99
}, {
    type: DISCOUNT_TYPE_THRESHOLD,
    ad: CLASSIC,
    price: 22,
    threshold: 4
}, {
    type: DISCOUNT_TYPE_X_FOR_Y,
    ad: CLASSIC,
    x: 5,
    y: 1
}];

const mockProducts = {};
mockProducts[CLASSIC] = { basePrice: 777 };
mockProducts[STANDOUT] = { basePrice: 7777 };
mockProducts[PREMIUM] = { basePrice: 77777 };

it('renders correctly with valid discounts', () => {
    const cart = {
        values: {}
    };
    cart.values[CLASSIC] = { quantity: 22 };
    cart.values[STANDOUT] = { quantity: 2 };
    cart.values[PREMIUM] = { quantity: 9 };

    const tree = renderer.create(
        <AdPacksTotal products={mockProducts} discounts={mockDiscounts} adPacksForm={cart} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with no valid discounts', () => {
    const cart = {
        values: {}
    };
    cart.values[CLASSIC] = { quantity: 22 };
    cart.values[STANDOUT] = { quantity: 2 };
    cart.values[PREMIUM] = { quantity: 9 };

    const tree = renderer.create(
        <AdPacksTotal products={mockProducts} discounts={[]} adPacksForm={cart} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with nothing in cart', () => {
    const cart = {
        values: {}
    };
    cart.values[CLASSIC] = { quantity: 0 };
    cart.values[STANDOUT] = { quantity: 0 };
    cart.values[PREMIUM] = { quantity: 0 };

    const tree = renderer.create(
        <AdPacksTotal products={mockProducts} discounts={mockDiscounts} adPacksForm={cart} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});