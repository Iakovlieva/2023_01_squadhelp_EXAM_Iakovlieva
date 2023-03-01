
import React from 'react';
import styles from './HowItWorks.module.css';
import CONSTANTS from '../../constants';
import classNames from 'classnames';

const HowNaming = () => {
    return (
        <section className={classNames(styles.wrapperFlexColumnStartCenter, styles.widthAndBorder)}>
            <article className={styles.wrapperFlexColumnStartCenter}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/03_how_naming_work.png`} />                  
                <h2>How Do Naming Contests Work?</h2>
            </article>
            <article className={classNames(styles.wrapperFlexRowSpaceBetween)} style={{paddingTop: '10vh'}}>
                <img className={styles.withNoutImage} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/04_with_nout.png`}/>
                <ul className={styles.namingList}>
                    <li className={classNames(styles.namingListItem, styles.radius03Rem)}>
                        <span>1.</span><p className={styles.advertisingText}>Fill out your Naming Brief and begin receiving name ideas in minutes</p>
                    </li>
                    <li className={classNames(styles.namingListItem, styles.radius03Rem)}>
                        <span>2.</span><p className={styles.advertisingText}>Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.</p>
                    </li>
                    <li className={classNames(styles.namingListItem, styles.radius03Rem)}>
                        <span>3.</span><p className={styles.advertisingText}>Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.</p>
                    </li>
                    <li className={classNames(styles.namingListItem, styles.radius03Rem)}>
                        <span>4.</span><p className={styles.advertisingText}>Pick a Winner. The winner gets paid for their submission.</p>
                    </li>
                </ul>
            </article>
        </section>
    );
}

export default HowNaming;