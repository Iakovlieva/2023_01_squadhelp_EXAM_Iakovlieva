import React, { useEffect, useState } from 'react';
import styles from "../ContestForm/ContestForm.module.sass";
import moment from 'moment';


const EventsItem = (props) => {
  const [ total, setTotal ] = useState(0);
  const {item: {eventName, eventDate, deadline, id}, maxGreenValue} = props;
  let timeinterval;


  useEffect(() => {
    updateClockToNotification();
    timeinterval = setInterval(updateClockToNotification, 1000);      

    return () => {
      clearInterval(timeinterval);      
    }
  },[]);
   
  function updateClockToNotification() {  
    const timeToNotification = Date.parse(eventDate) - Date.parse(new Date());//- deadline*60*1000;
    setTotal(timeToNotification);
    if (timeToNotification <= 0) { 
      clearInterval(timeinterval);
      props.rerender(eventName);
     // timeinterval = setInterval(updateClockToEvent, 1000);  
    }
  }

/*  function updateClockToEvent() {  
    const timeToEvent = Date.parse(eventDate) - Date.parse(new Date());
    if (timeToEvent <= 0) { 
      clearInterval(timeinterval);
      props.rerender();
    }
  }
  
*/


  const days = Math.floor(total / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(total / (1000 * 60 * 60 * 24)) + ' days ' : '';  
  const hours = (Math.floor((total / (1000 * 60 * 60)) % 24) > 0) || days  ? Math.floor((total / (1000 * 60 * 60)) % 24) + 'h ' : '';  
  const minutes = (Math.floor((total / (1000 * 60 ) ) % 60) >0) || hours ? Math.floor((total / (1000 * 60 ) ) % 60) + 'm ': '';  
  const seconds = Math.floor((total / 1000) % 60)+'s ';
  const remainingTime = `${days} ${hours} ${minutes} ${seconds}`;

  const timeToNotoficate = total- deadline*60*1000;
  
  let bgColor = timeToNotoficate > 0 ? "#eee" : "orange";
  const procentToNotification=100-Math.ceil(total*100/maxGreenValue)+'%';
  

  return (
    <li>
      <div className={styles.eventListItem}  style={{backgroundColor: bgColor }}>        
        {timeToNotoficate>0 && <div className={styles.eventListItemGreen} style={{width: procentToNotification}} >.</div>}
          <div>
            <span>{eventName}</span>
            <span> ( {moment(eventDate).format('DD-MM-YYYY HH:mm')} )</span>             
          </div>
          <div className={styles.eventListItemTiming}>
              <span> { timeToNotoficate>0 && ( remainingTime ) }</span>           
              <button onClick={() => props.delete(id)}>X</button>                               
          </div>               
      </div>
    </li>        
  );
}

export default EventsItem;
