import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventList';
import { Suspense } from 'react';

function EventsPages() {

    const {events} = useLoaderData()

    /*if(data.isError) {
    
        return (
            
            <p>{data.message}</p>   
            
        )
    
    }*/
    
    return (

        // retroce mientras esperamos otros datos
        <Suspense fallback={<p style={{textAlign: "center"}}>Loanding</p>}>
            
            <Await resolve={events}>

                {(loadedEvents) => <EventsList events={loadedEvents} /> }
    
            </Await>

        </Suspense>

    );

}

export default EventsPages

const loaderEvent = async() => {

    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {

       //return {isError: true, message: "Could not fecth events"}

       //throw new Response(JSON.stringify({message: "Could not fecth events"}), {status: 500})

        throw json({message: "Could not fecth events"}, {

            status: 500
    
        })
        
    } else {
      
        const resData = await response.json()

        return resData.events
      
    }

}

export const Loader = () => {

    // todas las diferentes peticiones
    return defer({
        
        events: loaderEvent()
    
    })
    
}