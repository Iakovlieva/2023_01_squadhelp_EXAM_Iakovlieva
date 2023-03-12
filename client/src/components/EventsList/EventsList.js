import React, {useState} from 'react';
import EventsItem from '../EventsItem/EventsItem';
import styles from "../EventsForm/Events.module.sass";
import moment from 'moment';

const EventsList = (props) => {
    const [updList, setupdList] = useState(null);
    
    const updParent = (data)=>{
        setupdList(data);
    }

    const arrToList = () => {
        const {eventsList, delCallback} = props;

        const notificationList=eventsList.map((elem)=>
            {
                elem.timeToNotification = Date.parse(elem.eventDate) - Date.parse(new Date())- elem.deadline*60*1000;
                elem.timeToEvent = Date.parse(elem.eventDate) - Date.parse(new Date());
                return elem;                
            })
            .sort((a,b)=> b.timeToEvent>a.timeToEvent ? -1 :1)          //если заменить timeToEvent на timeToNotification то будут выводиться в порядке дедлайнов-предупреждений, а сейчас "оранжевый может попасться среди зеленых"
            .filter((elem) => (elem.timeToEvent>0));   
      
        let maxGreenValue=7*24*60*60*1000; //7 days   

        for (let i = notificationList.length-1; i >= 0; i-- ) {
            if (notificationList[i].timeToNotification > 0) {
                maxGreenValue = notificationList[i].timeToNotification;
                break;
            }
        }

        let countOverdueEvents = eventsList.length-notificationList.length;

        return (
            <>
            {countOverdueEvents>0 && <div className={styles.eventListItem} style={{backgroundColor: "red"}}> Count Of Overdue Events is - {countOverdueEvents}</div>}
            {notificationList.length>0 && 
                <ul className={styles.eventListUl} >
                    { notificationList.map((elem)=> 
                        <EventsItem 
                                key={elem.id} item = {elem} delete={delCallback}
                                maxGreenValue={maxGreenValue} rerender={updParent}
                        />
                        ) 
                    }
                </ul>
                }
            </>
        )
    }


    return (
        <>
        { props.eventsList.length>0 && arrToList() }
        </>        
    );
}

export default EventsList;

