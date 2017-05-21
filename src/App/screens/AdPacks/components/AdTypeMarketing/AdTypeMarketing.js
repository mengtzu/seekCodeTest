import React from 'react';
import styles from './AdTypeMarketing.less';
import { Text } from 'seek-style-guide/react';

import { CLASSIC, STANDOUT, PREMIUM } from '../../../../../shared/constants/products';

const getClassName = (adType) => {
    switch(adType) {
        case CLASSIC:
            return styles.classic;
            break;
        case STANDOUT:
            return styles.standout;
            break;
        case PREMIUM:
            return styles.premium;
            break;
    }
};

const getCopy = (adType) => {
    const standOutCopy = () => (
        <div>
            <Text critical>Company logo to promote your brand</Text>
            <Text critical>Additional 3 selling points to sell your role</Text>
            <Text critical>Bold, eye-catching border</Text>
        </div>
    );

    if (adType === STANDOUT) {
        return standOutCopy();
    }

    if (adType === PREMIUM) {
        return (
            <div>
                {standOutCopy()}
                <Text critical strong>Priority position at the top of search results for 7 days</Text>
            </div>
        )
    }
};

const AdTypeMarketing = ({ adType }) => {
    return (
        <div className={getClassName(adType)}>
            <Text>30 days on site allowing you to make unlimited changes</Text>
            <Text>Matched to relevant candidates via email</Text>
            <Text>Appears across mobile, desktop and tablet devices</Text>
            <Text>Access to proactively find profiles on SEEK Talent Search</Text>
            <Text>Free candidate management tools</Text>
            {getCopy(adType)}
        </div>
    )
};

export default AdTypeMarketing;

