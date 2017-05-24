import React from 'react';
import { AdTypeMarketing } from './AdTypeMarketing';
import renderer from 'react-test-renderer';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../../../shared/constants/products';

it('renders correctly for Classic', () => {
    const tree = renderer.create(
        <AdTypeMarketing adType={CLASSIC} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly for Standout', () => {
    const tree = renderer.create(
        <AdTypeMarketing adType={STANDOUT} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly for PREMIUM', () => {
    const tree = renderer.create(
        <AdTypeMarketing adType={PREMIUM} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});