import React from 'react';
import styles from './CodeTestHelpMessage.less';
import {
    PageBlock,
    Card
} from 'seek-style-guide/react'

//This is a silly component, only used for meta purposes in the code test

const getIconStyle = (icon) => {
    switch(icon) {
        case 'beatrix':
            return styles.beatrix;
            break;  //You'll never reach this break but I think it's useful to stick to a case: {whatever} break; pattern
        case 'yoroshiku':
            return styles.yoroshiku;
            break;
        case 'otsukaresama':
            return styles.otsukaresama;
            break;
        case 'chotto':
            return styles.chotto;
            break;
        case 'gujjobu':
            return styles.gujjobu;
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
