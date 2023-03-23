import {getEvents, createEvent, deleteEvent, deleteDeadEvents} from '../api/eventController';
import {
    getEventsSuccess,
    getEventsError,
    createEventSuccess,
    createEventError,
    deleteEventSuccess,
    deleteEventError,
    deleteDeadEventsSuccess,
    deleteDeadEventsError
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

export function* deleteDeadEventsSaga(action) {
    try {             
         const data = yield deleteDeadEvents(action.payload);
         yield put(deleteDeadEventsSuccess(data));
    } catch(error) {
        yield put(deleteDeadEventsError(error));
    }
}