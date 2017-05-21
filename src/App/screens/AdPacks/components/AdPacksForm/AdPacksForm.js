import React from 'react';
import { Field, reduxForm } from 'redux-form'
import {
    Text,
    PageBlock,
    Card,
    Section,
    Dropdown,
    Button
} from 'seek-style-guide/react';
import styles from './AdPacksForm.less';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../../../shared/constants/products';
import Discounts from '../Discounts/Discounts';
import AdTypeSubtotal from '../AdTypeSubtotal/AdTypeSubtotal';
import AdPacksTotal from '../AdPacksTotal/AdPacksTotal';

const gstLabel = () => (
    <span className={styles.gstLabel}>+GST</span>
);

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

const AdPacksForm = ({ products, handleSubmit, submitting }) => {
    return (
        <form onSubmit={handleSubmit}>
            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>
                            Classic Ad
                        </Text>
                        <Text>${products.classic.basePrice} {gstLabel()}</Text>
                        <Discounts adType={ CLASSIC } />
                        <Text strong>Add <Field name={ CLASSIC + '.quantity' } component={dropdownRenderer} /> to account</Text>
                        <AdTypeSubtotal adType={ CLASSIC } />
                    </Section>
                </Card>
            </PageBlock>

            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>
                            Standout Ad
                        </Text>
                        <Text>${products.standout.basePrice} {gstLabel()}</Text>
                        <Discounts adType={ STANDOUT } />
                        <Text strong>Add <Field name={ STANDOUT + '.quantity' } component={dropdownRenderer} /> to account</Text>
                        <AdTypeSubtotal adType={ STANDOUT } />
                    </Section>
                </Card>
            </PageBlock>

            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>
                            Premium Ad
                        </Text>
                        <Text>${products.premium.basePrice} {gstLabel()} </Text>
                        <Discounts adType={ PREMIUM } />
                        <Text strong>Add <Field name={ PREMIUM + '.quantity' } component={dropdownRenderer} /> to account</Text>
                        <AdTypeSubtotal adType={ PREMIUM } />
                    </Section>
                </Card>
            </PageBlock>

            <PageBlock>
                <Card>
                    <Section>
                        <AdPacksTotal />
                        <Button type="submit" loading={submitting} color="pink">Checkout</Button>
                    </Section>
                </Card>
            </PageBlock>
        </form>
    )
};

export default reduxForm({ form: 'adPacksForm', initialValues })(AdPacksForm);

