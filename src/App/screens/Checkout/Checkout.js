import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    PageBlock,
    Card,
    Section,
    Strong,
    Button
} from 'seek-style-guide/react';
import styles from './Checkout.less';
import { formatMoney } from 'accounting-js';
import './VISA-logo.png';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../shared/constants/products';
import { completePayment } from './actions/checkoutActions';
import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';

const mapStateToProps = (state) => {
    return {
        checkout: state.checkout,
        advertiser: state.advertiser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handlePayment: (history, checkout) => {
            return completePayment(dispatch, history, checkout);
        }
    }
}

const renderLineItem = (label, lineItem) => {
    if (lineItem.quantity && lineItem.subTotal) {
        return (
          <Card>
              <Section>
                  <Text heading strong>{label}</Text>
                  <div className={styles.lineItemWrapper}>
                      <Text>Quantity: {lineItem.quantity}</Text>
                      <Text className={styles.lineItemPrice} strong>{formatMoney(lineItem.subTotal)}</Text>
                  </div>
              </Section>
          </Card>  
        );
    } else {
        return null;
    }
};

const Checkout = ({ checkout, advertiser, history, handlePayment }) => {

    const onPaymentClick = () => {
        return handlePayment(history, checkout);
    };

    const returnToAdPacks = () => {
        history.push('/adPacks');
    };

    const fourOhFour = () => {
        //Doesn't look right without it but not implemented :)
        history.push('/fourOhFour');
    }

    if (checkout.grandTotal) {
        return (
            <div>
                <PageBlock>
                    <Section header>
                        <Text hero>Checkout</Text>
                    </Section>

                    <div className={styles.paymentInfoWrapper}>
                        <div className={styles.lineItemsWrapper}>
                            {renderLineItem("Classic Ads", checkout[CLASSIC])}
                            {renderLineItem("Standout Ads", checkout[STANDOUT])}
                            {renderLineItem("Premium Ads", checkout[PREMIUM])}
                        </div>
                        <div className={styles.cardInfoWrapper}>
                            <Card>
                                <Section>
                                    <Text>Using saved card for <Strong>{advertiser.displayName}</Strong></Text>
                                    <div className={styles.cardWrapper}>
                                        <div className={styles.creditCardLogo}></div>
                                        <div className={styles.creditCardText}>
                                            <Text>422******2222</Text>
                                            <Text><Strong>Expiry: </Strong> 12/55</Text>
                                        </div>
                                    </div>
                                </Section>
                                <Section>
                                    <Button color="blue" onClick={fourOhFour}>Change</Button>
                                </Section>
                            </Card>
                        </div>
                    </div>

                    <div className={styles.paymentActionWrapper}>
                        <Section>
                            <Text heading>Total</Text>
                            <div className={styles.totalItemWrapper}>
                                <Text>Sub Total:</Text>
                                <Text className={styles.totalItemPrice} strong>{formatMoney(checkout.subTotal)}</Text>
                            </div>
                            <div className={styles.totalItemWrapper}>
                                <Text>GST:</Text>
                                <Text className={styles.totalItemPrice} strong>{formatMoney(checkout.gst)}</Text>
                            </div>
                            <div className={styles.totalItemWrapper}>
                                <Text strong>Grand Total:</Text>
                                <Text className={styles.totalItemPrice} strong>{formatMoney(checkout.grandTotal)}</Text>
                            </div>
                        </Section>
                        <Section>
                            <Button color="pink" loading={checkout.paying} onClick={onPaymentClick}>Pay Now</Button>
                            <Button className={styles.backButton} color="transparent" onClick={returnToAdPacks}>Go back</Button>
                        </Section>
                    </div>

                </PageBlock>

                <CodeTestHelpMessage icon="chotto">
                    <Text heading>Stripe integration not included</Text>
                    <Text>An actual checkout step requires some care around stored cards, confirming payments and making sure the user knows exactly what is happening with their money.  We're skipping those details here, but it just wouldn't seem right to not put this arguably necessary speedbump in for authentic UX!</Text>
                </CodeTestHelpMessage>
            </div>
        )
    } else {
        returnToAdPacks();  //We got here through a back button or somesuch with an empty cart, that's no good!
        return null;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);