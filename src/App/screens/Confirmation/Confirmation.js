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
import { routes } from '../../constants/routes';
import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';


export const Confirmation = () => {
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
                    <Link to={routes.adPacks}>
                        <Text>Purchase more ads</Text>
                    </Link>
                    <TextLink href={routes.logout}>
                        <Text>Sign out</Text>
                    </TextLink>
                </Section>
            </PageBlock>

            <CodeTestHelpMessage icon="gujjobu">
                <Text heading>You did it!</Text>
                <Text>Thanks for clicking this far.   There's no other flows to be tested but you can buy more ads or log in as a different user to see different discounts applied.</Text>
            </CodeTestHelpMessage>
        </div>
    )
};

export default Confirmation