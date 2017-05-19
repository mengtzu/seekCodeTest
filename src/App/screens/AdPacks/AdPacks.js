import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    PageBlock,
    Section,
    Card
} from 'seek-style-guide/react';
import styles from './AdPacks.less';

import CodeTestHelpMessage from '../../components/CodeTestHelpMessage/CodeTestHelpMessage';

const mapStateToProps = (state) => {
    return {
        products: state.products
    };
};

const gstLabel = () => (
    <span className={styles.gstLabel}>+GST</span>
);

const AdPacks = ({ products }) => {
    return (
        <div>
            <CodeTestHelpMessage icon="yoroshiku">
                <Text heading>You logged in, well done!</Text>
                <Text>Honestly we weren't sure you'd ever make it</Text>
            </CodeTestHelpMessage>
    
            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>
                            Classic Ad
                        </Text>
                        <Text>${products.classic.basePrice} {gstLabel()}</Text>
                    </Section>
                </Card>
            </PageBlock>

            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>
                            Standout Ad
                        </Text>
                        <Text>${products.standout.basePrice} {gstLabel()}</Text>
                    </Section>
                </Card>
            </PageBlock>

            <PageBlock>
                <Card>
                    <Section>
                        <Text heading>
                            Premium Ad
                        </Text>
                        <Text>${products.premium.basePrice} {gstLabel()} </Text>
                    </Section>
                </Card>
            </PageBlock>
        </div>
    )
};

export default connect(mapStateToProps)(AdPacks);