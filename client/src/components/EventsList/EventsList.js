import React, {useState} from 'react';
import EventsItem from '../EventsItem/EventsItem';
import styles from "../EventsForm/Events.module.sass";
import { toast } from 'react-toastify';
import Notification from '../Notification/Notification';


const EventsList = (props) => {
    const [updList, setupdList] = useState(null);
    const [showRedList, setRedList] = useState(true);
    
    const updParent = (eventName)=>{
        toast(<Notification message={`Attention: Event ${eventName} deadline is coming`} />);          
        setupdList(eventName);
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
            .filter((elem) =>  (showRedList ? elem.timeToEvent>0 : true));   
            
            let countOverdueEvents=eventsList.reduce((acc, current)=>{
                if (current.timeToEvent <= 0) acc=acc+1;
                return acc;
            },0);
            if ( (countOverdueEvents === 0) && !showRedList ) setRedList(true);

        let maxGreenValue=7*24*60*60*1000; //7 days   

        for (let i = notificationList.length-1; i >= 0; i-- ) {
            if (notificationList[i].timeToNotification > 0) {
                maxGreenValue = notificationList[i].timeToNotification;
                break;
            }
        }

        return (
            <>
                <ul className={styles.eventListUl} >
                {(countOverdueEvents>0 ) && 
                    <div className={styles.eventListItem} style={{backgroundColor: "#d97575"}}> 
                        Count Of Overdue Events is - {countOverdueEvents}
                        <div className={styles.eventRemainingTime}>
                            <span onClick = {()=>setRedList(!showRedList)}> {showRedList ? String.fromCharCode(709) : String.fromCharCode(708) }</span>           
                            <span onClick={() => props.delDeadCallback(new Date())} >X</span>                               
                        </div> 
                    </div>
                }
                { notificationList.length>0 && 
                    notificationList.map((elem)=> 
                        <EventsItem 
                                key={elem.id} item={elem} delete={delCallback}
                                maxGreenValue={maxGreenValue} rerender={updParent}
                        />
                    )
                }
                </ul>

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

