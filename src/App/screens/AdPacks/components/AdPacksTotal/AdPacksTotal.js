import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    PageBlock,
    Section,
    Button
} from 'seek-style-guide/react';
import { formatMoney } from 'accounting-js';
import styles from './AdPacksTotal.less';

import { calculateTotal } from '../../../../../shared/calculatePrice/calculatePrice';
import PlusGST from '../PlusGST/PlusGST';

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

export const AdPacksTotal = ({ products, discounts, adPacksForm, submitting}) => {
    const calculatedTotal = calculateTotal({
        discounts,
        products,
        quantities: adPacksForm.values
    });

    if (calculatedTotal.subTotal) {
        return (
            <PageBlock>
                <Section>
                    <Text heading>Total</Text>
                    <Text subheading>{formatMoney(calculatedTotal.subTotal)} <PlusGST /> {renderSavings(calculatedTotal.savings)}</Text>

                    <Button type="submit" loading={submitting} color="pink" className={styles.checkoutButton}>Checkout</Button>
                </Section>
            </PageBlock>
        )
    } else {
        return null;
    }
};

export default connect(mapStateToProps)(AdPacksTotal);
