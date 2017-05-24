import React from 'react';
import { Discounts } from './Discounts';
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

it('renders correctly with valid discounts', () => {
    const tree = renderer.create(
        <Discounts adType={CLASSIC} discounts={mockDiscounts} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with no valid discounts', () => {
    const tree = renderer.create(
        <Discounts adType={STANDOUT} discounts={mockDiscounts} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with no discounts', () => {
    const tree = renderer.create(
        <Discounts adType={PREMIUM} discounts={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


