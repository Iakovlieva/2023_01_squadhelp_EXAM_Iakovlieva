import React from 'react';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';
import WayToUseCard from './WayToUseCard';

const WaysToUse = () => {
    return (
        <section className={classNames(styles.wrapperFlexColumnStartCenter, styles.widthAndPadding)}>
            <article className={styles.wrapperFlexColumnStartCenter}>
                <span className={classNames(styles.hintButton, styles.radius3Rem )}>Ous services</span>
                <h2>3 Ways To Use Squadhelp</h2>
                <p className={styles.advertisingText}>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
            </article>
            <article className={styles.grid}>
                <WayToUseCard
                    image = 'how_it_works/02_1_launch_contest.png'
                    text = 'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.'                    
                    sloganText = 'Launch a Contest'
                    buttonText = 'Launch a Contest'                    
                />
                <WayToUseCard
                    image = 'how_it_works/02_2_explore_names.png'
                    text = 'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design'                    
                    sloganText = 'Explore Names For Sale'
                    buttonText = 'Explore Names For Sale'                    
                />
                <WayToUseCard
                    image = 'how_it_works/02_3_agency_level.png'
                    text = 'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs'                   
                    sloganText = 'Agency-level Managed Contests'
                    buttonText = 'Learn More'                    
                />
            </article>
        </section>
    );
}

export default WaysToUse;