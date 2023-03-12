import React, { useState } from 'react';
import {Formik, Form, Field} from 'formik';
import styles from "../ContestForm/ContestForm.module.sass";
import eventstyles from "./Events.module.sass";
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import Schems from '../../validators/validationSchems';
import moment from 'moment';

const EventsForm = (props) => {
    const initialValues = {
        eventName: '',
        eventDate: moment(new Date()).format('yyyy-MM-DDTHH:mm'),
        deadline: 2,
    }
    const onSubmit = (value, actions) => {
        props.sendData(value);
        actions.resetForm();
    }

    const deadlineTimesOptions = ['2 min','5 min','10 min','15 min','30 min','45 min','1 hour', '1 hour 30 min','2 hours','3 hours','6 hours','9 hours','12 hours', '24 hours', '2 days', '3 days', '5 days', '1 week', '2 weeks'];
    const deadlineTimesValues = [2, 5, 10, 15, 30, 45, 60, 90 , 2*60, 3*60, 6*60, 9*60, 12*60, 24*60, 2*24*60, 3*24*60, 5*24*60, 7*24*60, 14*24*60];    

    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={Schems.EventSchema}
        >
            {(props) => (
                <div className={eventstyles.eventForm}>
                    <div className={eventstyles.eventInfo}> 
                        <h2>Add new remaining</h2>
                    </div> 
                    <Form className={styles.formContainer}>
                        <div className={styles.inputContainer}>
                            <span className={styles.inputHeader}>Name of remaining event</span>                        
                            <FormInput
                                name="eventName"
                                type="text"
                                label="Event Name"
                                classes={{
                                container: styles.componentInputContainer,
                                input: styles.input,
                                warning: styles.warning,
                                }} />               
                        </div>
                        <div className={styles.inputContainer}>
                            <span className={styles.inputHeader}>Event date</span>                        
                            <FormInput
                                name="eventDate"
                                type="datetime-local"
                                label="Event date"
                                classes={{
                                container: styles.componentInputContainer,
                                input: styles.input,
                                warning: styles.warning,
                                }} />               
                        </div>  
{/*
                        <div className={styles.inputContainer}>
                            <span className={styles.inputHeader}>Remain at:</span>                        
                            <FormInput
                                name="deadline"
                                type="datetime-local"
                                label="Event remaining time"                             
                                classes={{
                                container: styles.componentInputContainer,
                                input: styles.input,
                                warning: styles.warning,
                                }} />               
                        </div>   
*/}
                        <div className={styles.inputContainer}>
                            <SelectInput
                                name="deadline"
                                classes={{
                                inputContainer: styles.selectInputContainer,
                                inputHeader: styles.selectHeader,
                                selectInput: styles.select,
                                warning: styles.warning,
                                }}
                                header="Remain before:"
                                optionsArray={deadlineTimesOptions}
                                valueArray={deadlineTimesValues}                
                            />
                        </div>
                        <button className={eventstyles.buttonEventContainer} type="submit">Create</button>
                    
                   
                                                                 
                    </Form>      
                  </div>  
                )}
        </Formik>   
    );
}

export default EventsForm;