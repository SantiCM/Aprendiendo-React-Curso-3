import { Await, json,  redirect,  useRouteLoaderData } from "react-router-dom"
import EventItem from "../components/EventItem"
import EventsList from "../components/EventList"
import { Suspense } from "react"


const EventDetailPage = () => {

    //const params = useParams()

    const {event, events} = useRouteLoaderData("event-detail")
  
    return (

        <>

            <Suspense fallback={<p style={{textAlign: "center"}}>Loanding</p>}>

                <Await resolve={event}>

                    {(loadedEvent => <EventItem event={loadedEvent}></EventItem>) }

                </Await>

                <Await resolve={events}>

                    {(loadedEvents => <EventsList event={loadedEvents}></EventsList>) }

                </Await>

            </Suspense>

        </>

    )

}

export default EventDetailPage

const loadEvent = async(id) => {

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {

       //return {isError: true, message: "Could not fecth events"}

       //throw new Response(JSON.stringify({message: "Could not fecth events"}), {status: 500})

        throw json({message: "Could not fecth events"}, {

            status: 500
    
        })
        
    } else {
      
        const resData = await response.json()

        return resData.event
      
    }


}

const loadEvents = async() => {

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

export async function Loader({ request, params }) {
    
    const id = params.eventId;
  
    return defer({
        
        event: await loadEvent(id),
        
        events: loadEvents(),
    
    });
  
}


export const Action = async({params, request}) => {

    const eventId = params.eventId

    const response = await fetch("http://localhost:8080/events/" + eventId, {

        method: request.method

    })

    if(!response.ok) {
    
        throw json({message: "Could not delete event"}, {
        
            status: 500
        
        })
    
    } 

    return redirect("/events")

}