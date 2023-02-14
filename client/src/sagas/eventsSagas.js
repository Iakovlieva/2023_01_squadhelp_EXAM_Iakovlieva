import {getEvents, createEvent, deleteEvent} from '../api/eventController';
import {
    getEventsSuccess,
    getEventsError,
    createEventSuccess,
    createEventError,
    deleteEventSuccess,
    deleteEventError
} from '../actions/actionCreator';
import {put} from 'redux-saga/effects';


export function* getEventsSaga(action) {
    try {
         const data = yield getEvents();
         yield put(getEventsSuccess(data));
    } catch(error) {
        yield put(getEventsError(error));
    }
}


export function* createEventSaga(action) {
    try {      
         const data = yield createEvent(action.payload);        
         yield put(createEventSuccess(data));
    } catch(error) {
        yield put(createEventError(error));
    }
}


export function* deleteEventSaga(action) {
    try {             
         const data = yield deleteEvent(action.payload);
         yield put(deleteEventSuccess(data));
    } catch(error) {
        yield put(deleteEventError(error));
    }
}