import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'seek-style-guide/react';
import { formatMoney } from 'accounting-js';
import styles from './AdPacksTotal.less';

import { calculateTotal } from '../../../../../shared/calculatePrice/calculatePrice';

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

const AdPacksTotal = ({ products, discounts, adPacksForm}) => {
    const calculatedTotal = calculateTotal({
        discounts,
        products,
        quantities: adPacksForm.values
    });

    if (calculatedTotal.subTotal) {
        return (
            <Text strong>{formatMoney(calculatedTotal.subTotal)} {renderSavings(calculatedTotal.savings)}</Text>
        )
    } else {
        return null;
    }
};

export default connect(mapStateToProps)(AdPacksTotal);
