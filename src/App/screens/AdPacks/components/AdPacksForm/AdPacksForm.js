import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Text,
    PageBlock,
    Card,
    Section,
    Dropdown
} from 'seek-style-guide/react';
import styles from './AdPacksForm.less';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../../../shared/constants/products';
import Discounts from '../Discounts/Discounts';
import AdTypeSubtotal from '../AdTypeSubtotal/AdTypeSubtotal';
import AdPacksTotal from '../AdPacksTotal/AdPacksTotal';
import PlusGST from '../PlusGST/PlusGST';
import AdTypeMarketing from '../AdTypeMarketing/AdTypeMarketing';

const dropdownOptions = (() => {
    const dropDownArray = [];
    for (let i = 0; i <= 100; i++) {
        dropDownArray.push({ value: ''+ i, label: ''+ i});
    }
    return dropDownArray;
})();  //The IIFE is probably unnecessary but it felt better to isolate the oldschool for loop >_>

const dropdownRenderer = ({input, ...restProps}) => {
    return (
        <Dropdown
            {...restProps}
            inputProps={{...input}}
            options={dropdownOptions}
        />
    )
};

const initialValues = {
    classic: {
        quantity: '0'
    },
    standout: {
        quantity: '0'
    },
    premium: {
        quantity: '0'
    }
};

const renderAdType = (label, adType, basePrice) => (
    <PageBlock>
        <Card>
            <Section className={styles.adTypeWrapper}>
                <div className={styles.adCoreWrapper}>
                    <Text heading>
                        {label}
                    </Text>
                    <Text>${basePrice} <PlusGST /></Text>
                    <Discounts adType={ adType } />
                    <Text strong>Add <Field name={ adType + '.quantity' } component={dropdownRenderer} /> to account</Text>
                    <AdTypeSubtotal adType={ adType } />
                </div>
                <div className={styles.adMarketingWrapper}>
                    <AdTypeMarketing adType={ adType } />
                </div>
            </Section>
        </Card>
    </PageBlock>
);

const AdPacksForm = ({ products, handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            {renderAdType('Classic Ad', CLASSIC, products[CLASSIC].basePrice)}
            {renderAdType('Standout Ad', STANDOUT, products[STANDOUT].basePrice)}
            {renderAdType('Premium Ad', PREMIUM, products[PREMIUM].basePrice)}
            <AdPacksTotal submitting={submitting} />
        </form>
    )
};

export default reduxForm({ form: 'adPacksForm', initialValues })(AdPacksForm);

