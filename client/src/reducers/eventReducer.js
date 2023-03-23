import ACTION from '../actions/actionTypes';


const initialState = {
    eventsList: [],
    error: null    
  }

const eventReducer = (state = initialState, action) => { 
  switch (action.type) {
    case ACTION.GET_EVENTS_ERROR:
    case ACTION.CREATE_EVENT_ERROR:
    case ACTION.DELETE_EVENT_ERROR: {
          const {error} = action;
          return {
            ...state,
            error
          }
        }

    case ACTION.GET_EVENTS_SUCCESS: {
        const {data} = action;
        return {
            ...state,
            eventsList: data,
            error: null
        }
        }

        case ACTION.CREATE_EVENT_SUCCESS: {
        const {data: newEvent} = action;      
        return {
            ...state,
            eventsList: [...state.eventsList, newEvent],
            error: null
        }
        }

        case ACTION.DELETE_EVENT_SUCCESS: {
        const {data: deletedEventId} = action;
        const eventsList = state.eventsList.filter(ev => ev.id !== deletedEventId);   
        return {
            ...state,
            eventsList,
            error: null
        }
        }   
        
        case ACTION.DELETE_DEAD_EVENTS_SUCCESS: {
          const {data} = action;
          return {
              ...state,
              eventsList: data,
              error: null
          }
          }          

    default:
      return state;
  }
}

export default eventReducer;