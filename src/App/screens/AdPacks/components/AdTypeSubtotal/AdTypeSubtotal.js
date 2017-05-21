import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'seek-style-guide/react';
import { formatMoney } from 'accounting-js';
import styles from './AdTypeSubtotal.less';

import { calculateAdTypeSubtotal } from '../../../../../shared/calculatePrice/calculatePrice';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        discounts: state.advertiser.discounts,
        adPacksForm: state.form.adPacksForm
    };
};

const renderSavings = (savings) => {
    if (savings) {
        return (
            <span className={styles.savings}>(You save {formatMoney(savings)}!)</span>
        )
    } else {
        return null;
    }
};

const AdTypeSubtotal = ({ adType, products, discounts, adPacksForm}) => {
    let subTotal = 0;
    let savings = 0;

    if (products[adType] && adPacksForm.values[adType] && adPacksForm.values[adType].quantity) {
        const calculatedSubtotal =  calculateAdTypeSubtotal({
            basePrice: products[adType].basePrice,
            quantity: adPacksForm.values[adType].quantity,
            discounts,
            adType
        });

        subTotal = calculatedSubtotal.subTotal;
        savings = calculatedSubtotal.savings;
    }

    if (subTotal) {
        return (
            <Text strong>{formatMoney(subTotal)} {renderSavings(savings)}</Text>
        )
    } else {
        return null;
    }
};

export default connect(mapStateToProps)(AdTypeSubtotal);