import React from 'react';
import styles from './HowItWorks.module.css';
import CONSTANTS from '../../constants';

const HowWork = () => {
    return (
    <section className={styles.howWorkSection}>
        <article className={styles.howWorkArticle}>
            <span>World's #1 Naming Platform</span>
            <h1>How Does Squadhelp Work?</h1>
            <p>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
            <a href="# " className={styles.howWorkButton}><span class="fas fa-play mr-2"/> Play Video</a>
        </article>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}how_it_works/01_how_work.png`} />
    </section>
    );
}

export default HowWork;