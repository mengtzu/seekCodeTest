import React from 'react';
import styles from './SignIn.less';
import { connect } from 'react-redux';
import {
    PageBlock,
    Section,
    Text,
    AsidedLayout,
    Card,
    TextLink,
    Strong
} from 'seek-style-guide/react'

import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';
import SignInForm from './components/SignInForm/SignInForm';
import { signIn } from './actions/signInActions';

const renderAsideSignIn = () => (
    <Card transparent>
        <Section className={styles.marketing}>
            <Text heading>Australia trusts SEEK</Text>
            <Text>More candidates than anyone else</Text>
            <Text>Save time finding the right candidates</Text>
            <Text>We'll support you every step of the way</Text>
        </Section>
    </Card>
);

const SignIn = ({ history }) => {

    const handleSignIn = (values) => {
        return signIn(values, history);
    };

    return (
        <div className={styles.root}>
            <PageBlock>
                <Section header>
                    <Text hero>Advertiser Sign In</Text>
                </Section>

                <AsidedLayout renderAside={renderAsideSignIn}>
                    <Card>
                        <Section>
                            <SignInForm onSubmit={handleSignIn} />
                            <Text>Don’t have an account? <TextLink href="/Register">Register</TextLink></Text>
                        </Section>
                    </Card>
                </AsidedLayout>
            </PageBlock>


            <CodeTestHelpMessage>
                <Text heading>Welcome to the SEEK Store code test</Text>
                <Text>Use <Strong>Apple</Strong>, <Strong>Ford</Strong>, <Strong>Unilever</Strong> or <Strong>Nike</Strong> as username to see discounts</Text>
                <Text>Use <Strong>SEEK</Strong> as username for standard pricing</Text>
                <Text>Password may be any string (that you don't mind being keylogged)</Text>
            </CodeTestHelpMessage>
            
        </div>
    )
};

export default SignIn
