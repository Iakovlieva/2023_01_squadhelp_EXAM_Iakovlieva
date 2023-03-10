import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import { getOffersForModerator,
  clearOffersList,
  setOfferStatus,
  clearSetOfferStatusErrorModerator,
  setNewModeratorFilter,
} from '../../actions/actionCreator';
import classNames from 'classnames';
import CONSTANTS from '../../constants';
import styles from './../CustomerDashboard/CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import Error from '../Error/Error';
import OfferBoxModerator from '../../components/OfferBox/OfferBoxModerator';

const ModeratorDashboard = (props) => {
  useEffect(() => {
    getOffers();

    return () => {
      props.clearOffersList();
    }
  },[]);

  useEffect(() => {
    getOffers();
  },[props.moderatorFilter]);

  const loadMore = (startFrom) => {
    props.getOffers({
      limit: 8,
      offset: startFrom,
      contestStatus: props.moderatorFilter,
    });
  };

  const getOffers = () => {  
    props.getOffers({
      limit: 8,
      offset: 0,
      contestStatus: props.moderatorFilter,
        });
  };

  const setOffersList = () => {
    const array = [];
    const { offers } = props;
    for (let i = 0; i < offers.length; i++) {
      array.push(<OfferBoxModerator
        data={offers[i]}
        key={offers[i].id}
        needButtons={needButtons}
        setOfferStatus={setOfferStatus}        
      />);
    }
    return array.length !== 0 ? array : <div className={styles.notFound}>There is no suggestion at this moment</div>;
  };

  const needButtons = (offerStatus, contestStatus) => {
    return (contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE && offerStatus === CONSTANTS.OFFER_STATUS_PENDING);
  };

  const setOfferStatus = (creatorId, offerId, contestId, command) => {
    props.clearSetOfferStatusErrorModerator();
    const obj = {
      command,
      offerId,
      creatorId,
      contestId,
    };
    props.setOfferStatus(obj);
  };


  const tryToGetContest = () => {
    props.clearOffersList();
    getOffers();
  };


  const { error, haveMore, setOfferStatusError, clearSetOfferStatusErrorModerator } = props;

  const { moderatorFilter } = props;

  return (
    <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            onClick={() => props.newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)}
            className={classNames({
              [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_ACTIVE === moderatorFilter,
              [styles.filter]: CONSTANTS.CONTEST_STATUS_ACTIVE !== moderatorFilter,
            })}
          >
            Active Contests
          </div>
          <div
            onClick={() => props.newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)}
            className={classNames({
              [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_FINISHED === moderatorFilter,
              [styles.filter]: CONSTANTS.CONTEST_STATUS_FINISHED !== moderatorFilter,
            })}
          >
            Completed contests
          </div>
          <div
            onClick={() => props.newFilter(CONSTANTS.CONTEST_STATUS_PENDING)}
            className={classNames({
              [styles.activeFilter]: CONSTANTS.CONTEST_STATUS_PENDING === moderatorFilter,
              [styles.filter]: CONSTANTS.CONTEST_STATUS_PENDING !== moderatorFilter,
            })}
          >
            Inactive contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusErrorModerator}
                  />
                )}
                {
                    error
                      ? <TryAgain getData={tryToGetContest()} />
                      :<ContestsContainer 
                          isFetching={props.isFetching}
                          loadMore={loadMore}
                          history={props.history}
                          haveMore={haveMore}
                        >
                          {setOffersList()}
                        </ContestsContainer>
                      
                }
        
        </div>
    </div>
  );
}

const mapStateToProps = (state) => state.offersList;

const mapDispatchToProps = (dispatch) => ({
  getOffers: (data) => dispatch(getOffersForModerator(data)),
  clearOffersList: () => dispatch(clearOffersList()),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusErrorModerator: () => dispatch(clearSetOfferStatusErrorModerator()),
  newFilter: (filter) => dispatch(setNewModeratorFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
