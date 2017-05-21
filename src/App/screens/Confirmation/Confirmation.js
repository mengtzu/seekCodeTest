import React from 'react';
import { Link } from 'react-router-dom';
import {
    Text,
    TextLink,
    PageBlock,
    Section,
    Card
} from 'seek-style-guide/react';
import styles from './Confirmation.less';

import AdPackBalance from '../../components/AdPackBalace/AdPackBalance';
import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';


const Confirmation = () => {
    return (
        <div className={styles.root}>
            <PageBlock>
                <Card>
                    <Section>
                        <Text hero>Nice one!</Text>
                        <Text>Your purchased ads have been added to your account allowance</Text>
                    </Section>
                </Card>
            </PageBlock>

            <AdPackBalance />

            <PageBlock>
                <Section>
                    <Link to="/adPacks">
                        <Text>Purchase more ads</Text>
                    </Link>
                    <TextLink href="/Login/Logout">
                        <Text>Sign out</Text>
                    </TextLink>
                </Section>
            </PageBlock>

            <CodeTestHelpMessage icon="gujjobu">
                <Text heading>You did it!</Text>
                <Text>Thanks for clicking this far.  90% of candidates' solutions require additional npm packages to be installed or other debugging to run, so if you got this far I assume you cleaned up at least one of my messes to do so.  Much obliged!</Text>
            </CodeTestHelpMessage>
        </div>
    )
};

export default Confirmation