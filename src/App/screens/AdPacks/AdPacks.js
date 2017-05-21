import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    PageBlock,
    Section,
    Card,
    Dropdown
} from 'seek-style-guide/react';

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
            <CodeTestHelpMessage icon="yoroshiku">
                <Text heading>You logged in, well done!</Text>
                <Text>Honestly we weren't sure you'd ever make it</Text>
            </CodeTestHelpMessage>

            <AdPacksForm onSubmit={handleCheckout} products={products} />

        </div>
    )
};

export default connect(mapStateToProps)(AdPacks);