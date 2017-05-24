import React from 'react';
import { AdPackBalance } from './AdPackBalance';
import renderer from 'react-test-renderer';
import { CLASSIC, STANDOUT, PREMIUM } from '../../../shared/constants/products';

const adStock = {};
adStock[CLASSIC] = 32;
adStock[STANDOUT] = 0;
adStock[PREMIUM] = 777;

it('renders correctly', () => {
    const tree = renderer.create(
        <AdPackBalance adStock={adStock}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
