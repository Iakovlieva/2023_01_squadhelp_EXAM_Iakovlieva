import React from 'react';
import CONSTANTS from '../../constants';
import styles from './HowItWorks.module.css';
import classNames from 'classnames';


const WayToUseCard = (props) =>{
    return(
        <div className={classNames(styles.wrapperFlexColumnStartCenter, styles.wayToUseCard, styles.radius03Rem)}>
            <img className={styles.cardImg}  src={`${CONSTANTS.STATIC_IMAGES_PATH}${props.image}`} />            
            <h3>{props.sloganText}</h3>
            <p className={styles.advertisingText} >{props.text}</p>
            <div className={classNames(styles.HowWorksButton, styles.radius03Rem)}>{props.buttonText}</div>
        </div>
    )
}
 
export default WayToUseCard;