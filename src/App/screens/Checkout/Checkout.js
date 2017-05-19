import React from 'react';
import { Text } from 'seek-style-guide/react';

import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';


const Checkout = () => {
    return (
        <CodeTestHelpMessage icon="chotto">
            <Text heading>Stripe integration not included</Text>
            <Text>An actual checkout step requires some care around stored cards, confirming payments and making sure the user knows exactly what is happening with their money.  We're skipping those details here, but it just wouldn't seem right to not put this arguably necessary speedbump in for authentic UX!</Text>
        </CodeTestHelpMessage>
    )
};

export default Checkout