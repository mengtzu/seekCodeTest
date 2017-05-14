import React from 'react';
import { Text } from 'seek-style-guide/react';

import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';


const AdPacks = () => {
    return (
        <CodeTestHelpMessage icon="yoroshiku">
            <Text heading>You logged in, well done!</Text>
            <Text>Honestly we weren't sure you'd ever make it</Text>
        </CodeTestHelpMessage>
    )
};

export default AdPacks