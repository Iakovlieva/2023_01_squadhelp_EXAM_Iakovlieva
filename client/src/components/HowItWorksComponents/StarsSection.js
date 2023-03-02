import React from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';
import CONSTANTS from '../../constants';

const StarsSection = () => {
    return (   
        <section className={classNames(styles.grid, styles.widthAndPadding)}>
            <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.starsPadding, styles.sleshes)}>
                <img className={styles.cardImg} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/06_1_star.png`}  />
                <p className={styles.advertisingText}><span>4.9 out of 5 stars</span> from 25,000+ customers.</p>
            </div>
            <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.starsPadding, styles.sleshes)}>
                <img className={styles.cardImg} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/06_2_community.png`} />
                <p className={styles.advertisingText}>Our branding community stands <span>200,000+</span> strong.</p>
            </div>
            <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.starsPadding)}>
                <img className={styles.cardImg} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/06_3_industries.png`} />
                <p className={styles.advertisingText}> <span>140+ Industries </span>supported across more than <span>85 countries </span>– and counting.</p>
            </div>  
        </section>
    );
}

export default StarsSection;