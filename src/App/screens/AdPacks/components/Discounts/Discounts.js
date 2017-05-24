import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'seek-style-guide/react';

import { DISCOUNT_TYPE_FLAT_RATE, DISCOUNT_TYPE_X_FOR_Y, DISCOUNT_TYPE_THRESHOLD } from '../../../../../shared/constants/discounts';

const mapStateToProps = (state) => {
    return {
        discounts: state.advertiser.discounts
    }
};

export const Discounts = ({ adType, discounts }) => {
    const discountsForDisplay = discounts.map((discount, index) => {
        if (discount.ad === adType) {
            switch (discount.type) {
                case DISCOUNT_TYPE_FLAT_RATE:
                    return (
                        <Text positive key={index}>Your price: ${discount.price}</Text>
                    );
                    break;
                case DISCOUNT_TYPE_THRESHOLD:
                    return (
                        <Text positive key={index}>Your price: ${discount.price} when you buy {discount.threshold} or more</Text>
                    );
                    break;
                case DISCOUNT_TYPE_X_FOR_Y:
                    return (
                        <Text positive key={index}>Get {discount.x} ads for the price of {discount.y}</Text>
                    );
                    break;
            }
        }
    });

    if (discountsForDisplay.length) {
        return (
            <div>{discountsForDisplay}</div>
        )
    } else {
        return null;
    }
};

export default connect(mapStateToProps)(Discounts);
