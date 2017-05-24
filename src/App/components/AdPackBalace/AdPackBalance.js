import React from 'react';
import { connect } from 'react-redux';
import {
    PageBlock,
    Card,
    Section,
    Text
} from 'seek-style-guide/react';
import styles from './AdPackBalance.less';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../shared/constants/products';

const mapStateToProps = (state) => {
    return {
        adStock: state.advertiser.adStock
    };
};

const renderPackBalance = (label, quantity) => {
    return (
        <div className={styles.packBalanceWrapper}>
            <Text strong className={styles.packBalanceText}>{label}:</Text>
            <Text className={styles.packBalanceQuantity}>{quantity}</Text>
        </div>
    )
};

export const AdPackBalance = ({ adStock }) => {
    return (
        <div className={styles.root}>
            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>Your available ads</Text>
                        {renderPackBalance('Classic', adStock[CLASSIC])}
                        {renderPackBalance('Standout', adStock[STANDOUT])}
                        {renderPackBalance('Premium', adStock[PREMIUM])}
                    </Section>
                </Card>
            </PageBlock>
        </div>
    )
};

export default connect(mapStateToProps)(AdPackBalance);