import React from 'react';
import { Text } from 'seek-style-guide/react';

import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';


const Confirmation = () => {
    return (
        <CodeTestHelpMessage icon="gujjobu">
            <Text heading>You did it!</Text>
            <Text>Thanks for clicking this far.  90% of candidates' solutions require additional npm packages to be installed or other debugging to run, so if you got this far I assume you cleaned up at least one of my messes to do so.  Much obliged!</Text>
        </CodeTestHelpMessage>
    )
};

export default Confirmation