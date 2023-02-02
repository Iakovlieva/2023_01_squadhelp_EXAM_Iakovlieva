import React from 'react';
import styles from './ContestInfo.module.sass';

const OfferShortContestInfo = (props) => {
  const { contestType, title } = props;
  return (
    <>
       <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </div>
    </>
  );
};

export default OfferShortContestInfo;