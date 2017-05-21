import React from 'react';
import { connect } from 'react-redux';
import {
    Text
} from 'seek-style-guide/react';

import AdPacksBalance from '../../components/AdPackBalace/AdPackBalance';
import AdPacksForm from './components/AdPacksForm/AdPacksForm';
import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';
import { goToCheckout } from './actions/adPackActions';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.advertiser.username
    };
};

const AdPacks = ({ products, user, history }) => {

    const handleCheckout = (values, dispatch) => {
        return goToCheckout(values, user, history, dispatch);  //Needs to be return if there's a promise in the chain
    };

    return (
        <div>
            <AdPacksBalance />
            <AdPacksForm onSubmit={handleCheckout} products={products} />

            <CodeTestHelpMessage icon="yoroshiku">
                <Text heading>For corporate use</Text>
                <Text>The specially negotiated prices indicate frequent use, but not at the insane level of bulk that would require a third party uploader.  I'm assuming the user is a corporate or other large org customer that is familiar with the product offerings and is already committed to posting many ads.  They don't need a hard sell but they may need reminders to help balance a recruiting budget.</Text>
            </CodeTestHelpMessage>
        </div>
    )
};

export default connect(mapStateToProps)(AdPacks);