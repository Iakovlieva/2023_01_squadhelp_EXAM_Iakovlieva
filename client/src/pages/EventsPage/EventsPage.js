import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {getEventsRequest, createEventRequest, deleteEventRequest, deleteDeadEventsRequest } from '../../actions/actionCreator';
import EventsList from '../../components/EventsList/EventsList';
import EventsForm from '../../components/EventsForm/EventsForm';
import Header from '../../components/Header/Header';
import styles from '../ContestPage/ContestPage.module.sass';

const EventsPage = (props) => {
    useEffect(()=>{
        props.getEventsRequest();
    }, []);


    const getNewEvent = (data) => {
        props.createEventRequest(data);
    }


    const delEvent = (id) => {
        props.deleteEventRequest(id);
    }

    const delDeadEvents = (date) => {
        props.deleteDeadEventsRequest(date);
    }

    return (
        <div>
             <Header />
             <div className={styles.mainInfoContainer}>
                <div className={styles.infoContainer}>
                    <EventsList eventsList={props.events.eventsList} delCallback={delEvent} delDeadCallback={delDeadEvents}/>                            
                    <EventsForm sendData={getNewEvent}/>            
                </div>
            </div>    
        </div>
    );
}

const mapStateToProps = ({events}) => ({events});


const mapDispatchToProps = {
    getEventsRequest, 
    createEventRequest, 
    deleteEventRequest,
    deleteDeadEventsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);