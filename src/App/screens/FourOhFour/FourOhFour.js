import React from 'react';
import { Text, TextLink } from 'seek-style-guide/react';

import { routes } from '../../constants/routes';
import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';


//This is just an example of a routing fallback

const FourOhFour = () => (
    <CodeTestHelpMessage icon="beatrix">
        <Text heading>Four Oh Four!</Text>
        <Text>While extravagantly overdone for a code test, this app still doesn't implement an entire hypothetical SEEK</Text>
        <Text><TextLink href={routes.root}>Let's try signing in!</TextLink></Text>
    </CodeTestHelpMessage>
);


export default FourOhFour
