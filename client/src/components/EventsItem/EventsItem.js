import React, { useEffect, useState } from 'react';
import styles from "../EventsForm/Events.module.sass";
import moment from 'moment';
import { toast } from 'react-toastify';
import Notification from '../Notification/Notification';

const EventsItem = (props) => {
  const {item: {eventName, eventDate, deadline, id}, maxGreenValue} = props;
  const [ timeLeft, setTimeLeft ] = useState(Date.parse(eventDate) - Date.parse(new Date()));  
  let timeinterval;


  useEffect(() => {
    timeinterval = setInterval(updateClockToNotification, 1000);      

    return () => {
      clearInterval(timeinterval);      
    }
  },[]);
   
  function updateClockToNotification() {  
    const timeToEvent = Date.parse(eventDate) - Date.parse(new Date());
    setTimeLeft(timeToEvent);
    if ( timeToEvent - deadline * 60 * 1000 === 0 ) {
       toast(<Notification message={`Attention: Event ${eventName} is coming`} />);      
    }     
    if ( timeToEvent === 0 ) {     
      clearInterval(timeinterval);    
      props.rerender(eventName);
    }
  }


  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(timeLeft / (1000 * 60 * 60 * 24)) + ' days ' : '';  
  const hours = (Math.floor((timeLeft / (1000 * 60 * 60)) % 24) > 0) || days  ? Math.floor((timeLeft / (1000 * 60 * 60)) % 24) + 'h ' : '';  
  const minutes = (Math.floor((timeLeft / (1000 * 60 ) ) % 60) >0) || hours ? Math.floor((timeLeft / (1000 * 60 ) ) % 60) + 'm ': '';  
  const seconds = Math.floor((timeLeft / 1000) % 60)+'s ';
  const remainingTime = `${days} ${hours} ${minutes} ${seconds}`;

  const timeToNotificate = timeLeft- deadline*60*1000;
  const deadlineTime = Date.parse(eventDate)-deadline*60*1000;
  
  let bgColor = timeToNotificate > 0 ? "#eee" : timeLeft > 0 ? "orange" : "#f1abab";
  
  const procentToNotification=100-Math.ceil(timeToNotificate*100/maxGreenValue)+'%';  


  return (
    <li>
      <div className={styles.eventListItem}  style={{backgroundColor: bgColor }}>        
          <div>
            <span>{eventName}</span>
            <span className={styles.eventListItemTiming}> (EventTime: {moment(eventDate).format('DD.MM.YYYY HH:mm')} DeadlineTime: {moment(deadlineTime).format('DD.MM.YYYY HH:mm')})</span>             
          </div>      
          <div className={styles.eventRemainingTime}>
              <span> { timeToNotificate>0 && ( remainingTime ) }</span>           
              <span onClick={() => props.delete(id)}>X</span>                               
          </div>   
          {timeToNotificate>0 && <div className={styles.eventListItemGreen} style={{width: procentToNotification}} >.</div>}                          
      </div>
    </li>        
  );
}

export default EventsItem;
