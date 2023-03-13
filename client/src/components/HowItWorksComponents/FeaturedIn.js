
import React from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import { Link } from 'react-router-dom';

const FeaturedIn = () => {
    return (   
    <section className={classNames(styles.wrapperFlexRowSpaceBetween, styles.widthAndPadding, styles.column770)}>
        <h3>Featured In</h3>
        <div className={classNames(styles.wrapperFlexRowSpaceBetween, styles.featuredImages)} style={{flexWrap: 'wrap'}}>
            <Link to="# "><img src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`} alt="Forbes"/></Link>
            <Link to="# "><img src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`} alt="next_web"/></Link>
            <Link to="# "><img src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/chicago.svg`} alt="chicago"/></Link>
            <Link to="# "><img src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`} alt="mashable"/></Link>
        </div>
    </section>
    );
}

export default FeaturedIn;