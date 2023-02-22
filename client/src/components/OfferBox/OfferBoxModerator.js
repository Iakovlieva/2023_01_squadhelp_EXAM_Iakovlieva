import React from 'react';
//import { connect } from 'react-redux';
import Rating from 'react-rating';
//import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';

const OfferBoxModerator = (props) => {

  const allowOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.userId, props.data.id, props.data.contestId, 'allow'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const forbidOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => props.setOfferStatus(props.data.userId, props.data.id, props.data.contestId, 'forbid'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const offerStatus = () => {
    const { status } = props.data;
    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return <i className={classNames('fas fa-times-circle reject', styles.reject)} />;
    } if (status === CONSTANTS.OFFER_STATUS_WON) {
      return <i className={classNames('fas fa-check-circle resolve', styles.resolve)} />;
    } if (status === CONSTANTS.OFFER_STATUS_ALLOWED) {
    return <i className={classNames('fas fa-thumbs-up resolve', styles.resolve)} />;
    } if (status === CONSTANTS.OFFER_STATUS_FORBIDDEN) {
    return <i className={classNames('fas fa-thumbs-down reject', styles.reject)} />;
    }      
    return null;
  };

  const { data, data: {Contest} } = props;
  
  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={CONSTANTS.ANONYM_IMAGE_PATH}
              alt="user"
            /> 
            <div className={styles.nameAndEmail}>
              <span>Contest Customer: <span>{Contest.User.displayName}</span></span>
              <span>Contest: <span>{Contest.title}</span></span>
              <span>Contest type: <span>{Contest.contestType}</span></span>
              <span>Industry: <span>{Contest.industry}</span></span>
              <span>Contest is {Contest.status}</span>               
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={data.User.rating}
              fractions={2}
              fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
              emptySymbol={(
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
                )}
              readonly
            />
          </div>          
        </div>
        <div className={styles.responseConainer}  style={{width: '60%'}}>
          {
                        Contest.contestType === CONSTANTS.LOGO_CONTEST
                          ? (
                            <img
                              className={styles.responseLogo}
                              src={`${CONSTANTS.publicURL}${data.fileName}`}
                              alt="logo"
                            />
                          )
                          : <span className={styles.response}>{data.text}</span>
                    }
                    
        </div>
      </div>
      {props.needButtons(data.status, Contest.status) && (
      <div className={styles.btnsContainer}>
        <div onClick={allowOffer} className={styles.resolveBtn}>Allow</div>
        <div onClick={forbidOffer} className={styles.rejectBtn}>Forbid</div>
      </div>
      )}
    </div>
  );
};


export default OfferBoxModerator;
