import React from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import { Link } from 'react-router-dom';

const ReadyToStart = () => {
    return (
        <section className={classNames(styles.blueGradient, styles.wrapperFlexColumnStartCenter)}>        
            <h2>Ready to get started?</h2>
            <p className={styles.advertisingText}>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
            <Link  className={classNames(styles.HowWorksButton, styles.blueTextWhiteBack, styles.radius03Rem )} to="/startContest">Start A Contest</Link>
            <img className={styles.leftPart} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/05_left_part.png`} />
            <img className={styles.rightPart} src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/05_right_part.png`} />                
         </section>
    );
}

export default ReadyToStart;