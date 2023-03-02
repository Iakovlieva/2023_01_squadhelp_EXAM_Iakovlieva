import React from 'react';
import styles from './HowItWorks.module.css';
import CONSTANTS from '../../constants';
import classNames from 'classnames';
import Accordeon from './Accordeon';
import AccordeonUseState from './AccordeonUseState';

const LauncingContest = () => {
    return (
        <section className={classNames(styles.wrapperFlexRowSpaceBetween, styles.widthAndPadding, styles.alignFlexStart, styles.column992)} style={{justifyContent: 'flex-start'}}>
            <ul className={classNames(styles.menuFaq, styles.wrapperFlexColumnStartCenter, styles.alignFlexStart, styles.radius03Rem, styles.allWidth992)} >
                <li className={styles.navigationLaunching}><a href='#contests'>Launching A Contest</a></li>
                <li className={styles.navigationLaunching}><a href="#marketplace">Buying From Marketplace</a></li>
                <li className={styles.navigationLaunching}><a href="#managed">Managed Contests</a></li>
                <li className={styles.navigationLaunching}><a href="#creatives">For Creatives</a></li>
            </ul>
            <article  className={classNames(styles.launchingArticle, styles.allWidth992)} >
                <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.alignFlexStart)} id="contests">
                    <h2>Launching A Contest</h2>
                    <Accordeon information={CONSTANTS.ACCORDEONITEMS.LAUNCHING_A_CONTEST}/>
                </div>
                <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.alignFlexStart)} id="marketplace">
                    <h2>Buying From Marketplace</h2>
                    <Accordeon information={CONSTANTS.ACCORDEONITEMS.BUYING_FROM_MARKETPLACE}/>
                </div>
                <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.alignFlexStart)} id="managed">
                    <h2>Managed Contests</h2>
                    <AccordeonUseState information={CONSTANTS.ACCORDEONITEMS.BUYING_FROM_MARKETPLACE}/>
                </div>
            </article>
      </section>
    );
}
export default LauncingContest;