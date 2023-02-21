import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import { getOffersForModerator,
  clearOffersList,
  setOfferStatus,
} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './../CustomerDashboard/CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import OfferBoxModerator from '../../components/OfferBox/OfferBoxModerator';

const ModeratorDashboard = (props) => {
  useEffect(() => {
    getOffers();

    return () => {
      props.clearOffersList();
    }
  },[]);


  const loadMore = (startFrom) => {
    props.getOffers({
      limit: 8,
      offset: startFrom,
    });
  };

  const getOffers = () => {  
    props.getOffers({
      limit: 8,
      offset: 0,
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


  const { error, haveMore, isShowOnFull, imagePath } = props;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contestsContainer}>
        {
                    error
                      ? <TryAgain getData={tryToGetContest()} />
                      : (
                        <ContestsContainer 
                          isFetching={props.isFetching}
                          loadMore={loadMore}
                          history={props.history}
                          haveMore={haveMore}
                        >
                          {setOffersList()}
                        </ContestsContainer>
                      )
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
