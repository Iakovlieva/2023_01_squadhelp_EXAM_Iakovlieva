import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  error: null,
  offers: [],
  haveMore: true,
};

function getOffersReducer (state = initialState, action) {  
  switch (action.type) {
    case ACTION.GET_OFFERS_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GET_OFFERS_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: [...state.offers, ...action.data.offers],
        haveMore: action.data.haveMore,
      };
    }
    case ACTION.GET_OFFERS_ACTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
        offers: [],
      };
    }
    case ACTION.CHANGE_OFFER_STATUS_FROM_MODERATOR: {
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: [...action.data],
      };
    }
    case ACTION.CLEAR_OFFERS_LIST: {
      return {
        ...state,
        error: null,
        offers: [],
      };
    }
    default:
      return state;
  }
}

export default getOffersReducer; 