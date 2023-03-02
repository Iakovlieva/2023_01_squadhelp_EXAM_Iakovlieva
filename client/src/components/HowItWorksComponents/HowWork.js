import React from 'react';
import styles from './HowItWorks.module.css';
import CONSTANTS from '../../constants';
import classNames from 'classnames';

const HowWork = () => {
    return (
        <section className={classNames(styles.wrapperFlexRowSpaceBetween, styles.widthAndPadding)}>
            <article className={classNames(styles.howWorkArticle, styles.wrapperFlexColumnStartCenter, styles.alignFlexStart, styles.allWidth992)}>
                <span className={classNames(styles.hintButton, styles.radius3Rem )}>World's #1 Naming Platform</span>
                <h1>How Does Squadhelp Work?</h1>
                <p className={styles.advertisingText}>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
                <a href="# " className={classNames(styles.BlueButton, styles.radius3Rem)}><span className="fas fa-play mr-2"/> Play Video</a>
            </article>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/01_how_work.png`} />
        </section>
    );
}

export default HowWork;