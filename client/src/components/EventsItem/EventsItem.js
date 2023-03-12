import React, { useEffect, useState } from 'react';
import styles from "../EventsForm/Events.module.sass";
import moment from 'moment';


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
    const timeToEvent = Date.parse(eventDate) - Date.parse(new Date());//- deadline*60*1000;  //timetoNotification
    setTimeLeft(timeToEvent);
    if (timeToEvent <= 0) { 
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


  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) > 0 ? Math.floor(timeLeft / (1000 * 60 * 60 * 24)) + ' days ' : '';  
  const hours = (Math.floor((timeLeft / (1000 * 60 * 60)) % 24) > 0) || days  ? Math.floor((timeLeft / (1000 * 60 * 60)) % 24) + 'h ' : '';  
  const minutes = (Math.floor((timeLeft / (1000 * 60 ) ) % 60) >0) || hours ? Math.floor((timeLeft / (1000 * 60 ) ) % 60) + 'm ': '';  
  const seconds = Math.floor((timeLeft / 1000) % 60)+'s ';
  const remainingTime = `${days} ${hours} ${minutes} ${seconds}`;

  const timeToNotificate = timeLeft- deadline*60*1000;
  const deadlineTime = Date.parse(eventDate)-deadline*60*1000;
  
  let bgColor = timeToNotificate > 0 ? "#eee" : timeLeft > 0 ? "orange" : "red";
  
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
              <button onClick={() => props.delete(id)}>X</button>                               
          </div>   
          {timeToNotificate>0 && <div className={styles.eventListItemGreen} style={{width: procentToNotification}} >.</div>}                          
      </div>
    </li>        
  );
}

export default EventsItem;


/*
івенти відсортовані за часом самого івента, не часом до дедлайна
поруч з івентом вказується час що залишився до івента, не до настання дедлайна.
коли настає дедлайн - івент перестає відображати час і стає помаранчевим

коли дедлайн проходить - івент не відобрається у списку, а переходить до червоного бейджа просто як кількість

зелена полосока - трекінг до настання дедлайна


якщо виключити в EventList фільтрацію, будуть відображатися всі івенти - і "червоні" також, а "діва" з їх кількістю не буде

*/