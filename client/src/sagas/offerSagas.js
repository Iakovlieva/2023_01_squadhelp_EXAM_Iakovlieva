import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === action.data.offerId) {
        offer.mark = action.data.mark;
      }
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: offers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
     const { data } = yield restController.setOfferStatus(action.data);
    if ((action.data.command==='reject') || (action.data.command==='resolve')){
        const offers = yield select((state) => state.contestByIdStore.offers);    
        offers.forEach((offer) => {
          if (data.status === CONSTANTS.OFFER_STATUS_WON) {
            offer.status = data.id === offer.id ? CONSTANTS.OFFER_STATUS_WON : CONSTANTS.OFFER_STATUS_REJECTED;
          } else if (data.id === offer.id) {
            offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
          }
        });
        yield put({ type: ACTION.CHANGE_STORE_FOR_STATUS, data: offers });
   } else {
        const offers = yield select((state) => state.offersList.offers);   
        offers.forEach((offer) => {
          if (data.id === offer.id) {
            offer.status = action.data.command==='allow' ? CONSTANTS.OFFER_STATUS_ALLOWED: CONSTANTS.OFFER_STATUS_FORBIDDEN;
          }
        });
        yield put({ type: ACTION.CHANGE_OFFER_STATUS_FROM_MODERATOR, data: offers });
   }
  } catch (e) {
    if ((action.data.command==='reject') || (action.data.command==='resolve')){
      yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
    } else {
      yield put({ type: ACTION.SET_OFFER_STATUS_ERROR_MODERATOR, error: e.response });
    }
  }
}


export function* moderatorOffersSaga(action) {
  yield put({ type: ACTION.GET_OFFERS_ACTION_REQUEST });
  try {
    const { data } = yield restController.getModeratorOffers(action.data);
    yield put({ type: ACTION.GET_OFFERS_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_OFFERS_ACTION_ERROR, error: e.response });
  }
}

