import { Outlet } from "react-router-dom"
import EventsNavigation from "../components/EventsNavigation"


export const EventRoutes = () => {
  
    return (

        <>  

            <EventsNavigation></EventsNavigation>

            <Outlet></Outlet>
        
        </>
  
    )

}