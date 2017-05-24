import React from 'react';
import PlusGST from './PlusGST';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <PlusGST />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});