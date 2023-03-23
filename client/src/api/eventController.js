export const getEvents = async () => {
    const eventsList = JSON.parse(localStorage.getItem('EventsList')) || [];
    return eventsList;
}


export const createEvent = async (eventData) => {
    const eventsList = await JSON.parse(localStorage.getItem('EventsList')) || [];    
    const id = eventsList.length>0 ? eventsList[eventsList.length-1].id + 1 : 1;
    eventsList.push({...eventData, id});         
    localStorage.setItem('EventsList',JSON.stringify(eventsList));            
    return {...eventData, id};
}


export const deleteEvent = async (eventData) => {
    const eventsList = JSON.parse(localStorage.getItem('EventsList')) || [];
    const newEventsList = eventsList.filter((el)=>el.id!==eventData);
    localStorage.setItem('EventsList',JSON.stringify(newEventsList));
    return eventData;
}

export const deleteDeadEvents = async (deadline) => {
    const eventsList = JSON.parse(localStorage.getItem('EventsList')) || [];
    const newEventsList = eventsList.filter((el)=> (Date.parse(el.eventDate) - Date.parse(deadline)) > 0);
    localStorage.setItem('EventsList',JSON.stringify(newEventsList));
    return newEventsList;
}