import React from 'react';
import styles from './CodeTestHelpMessage.less';
import {
    PageBlock,
    AsidedLayout,
    Card
} from 'seek-style-guide/react'

const getIconStyle = (icon) => {
    switch(icon) {
        case 'beatrix':
            return styles.beatrix;
            break;
        case 'yoroshiku':
            return styles.yoroshiku;
            break;
        default:
            return styles.lyria;
    }
}

const CodeTestHelpMessage = ({children, icon, ...restProps}) => {
    return (
        <div {...restProps} className={styles.root}>
            <PageBlock>
                <Card className={getIconStyle(icon)}>
                    {children}
                </Card>
            </PageBlock>
        </div>
    )
};

export default CodeTestHelpMessage
