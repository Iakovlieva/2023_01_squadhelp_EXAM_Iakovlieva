import React from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';
import CONSTANTS from '../../constants';

const HaveQuestions = () => {
    return (   
        <section className={classNames(styles.wrapperFlexRowSpaceBetween, styles.alignFlexStart, styles.column992, styles.widthAndPadding)}>

            <article className={classNames(styles.leftWhitePart, styles.wrapperFlexColumnStartCenter, styles.allWidth992)}>
                <div className={classNames(styles.wrapperFlexRowSpaceBetween, styles.alignFlexStart, styles.allWidth992)}>
                    <span className={classNames(styles.hintButton, styles.radius3Rem )}><i className="fas fa-angle-right btn-icon__inner"/></span>
                    <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.alignFlexStart)}>
                        <h4>Pay a Fraction of cost vs hiring an agency</h4>
                        <p className={styles.advertisingText}>For as low as $199, our naming contests and marketplace allow you to get an amazing brand quickly and affordably.</p>
                    </div>
                </div>
                <div className={classNames(styles.wrapperFlexRowSpaceBetween, styles.alignFlexStart, styles.allWidth992)} >
                    <span className={classNames(styles.hintButton, styles.radius3Rem )}><i className="fas fa-angle-right btn-icon__inner"/></span>
                    <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.alignFlexStart)}>
                        <h4>Satisfaction Guarantee</h4>
                        <p className={styles.advertisingText}>Of course! We have policies in place to ensure that you are satisfied with your experience. <a href='# '>Learn more</a></p>
                    </div>                    
                </div>
            </article>
    
            <article className={classNames(styles.rightBluePart, styles.wrapperFlexColumnStartCenter, styles.alignFlexStart, styles.allWidth992)}>
                <h2>Questions?</h2>
                <p>Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
                <a href="# "className={classNames(styles.HowWorksButton, styles.blueTextWhiteBack, styles.radius3Rem)} >Schedule Consultation</a>
                <a href='# '><img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/phone_icon.svg`} alt='phone'/> (877)355-3585</a>
                <p>Call us for assistance</p>
            </article>
        </section>
    );
}

export default HaveQuestions;