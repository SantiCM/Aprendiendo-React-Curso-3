import { RouterProvider, createBrowserRouter } from "react-router-dom"
import  HomePage  from "./pages/HomePage"
import  EventDetailPage,  {Loader as eventDetailLoader, Action as deleteEventAction} from "./pages/EventDetailPage"
import NewEventPage  from "./pages/NewEventPage"
import { EditEventPage } from "./pages/EditEventPage"
import { RootLayout } from "./pages/Root"
import { EventRoutes } from "./pages/EventRoutes"
import  EventsPages, {Loader as eventsLoader} from "./pages/Event"
import { Error } from "./pages/Error"
import {Action as manipulateEventAction} from "./components/EventForm"
import NewsletterPage, {Action as newsletterAction} from "./components/Newsletter"

const router = createBrowserRouter([

  {
    
    path: "/", 
    
    element:<RootLayout></RootLayout>, 

    errorElement: <Error></Error>,
    
    children: [
    
      {index: true, element: <HomePage></HomePage>},

      {
        
        path: "events", 
        
        element: <EventRoutes></EventRoutes>,

        children: [
        
          {
            
            index: true , 
            
            element: <EventsPages></EventsPages>, 

            loader: eventsLoader,
        
          },

          {
            
            path: ":eventId",

            id: "event-detail",

            loader: eventDetailLoader,

            children: [
            
              {index: true, element: <EventDetailPage></EventDetailPage>, action: deleteEventAction},

              {path: "edit", element: <EditEventPage></EditEventPage>, action: manipulateEventAction},
            
            ]
          
          },

          {path: "new", element: <NewEventPage></NewEventPage>, action: manipulateEventAction },          
        ]
      
      },

      {path: "newsletter", element: <NewsletterPage></NewsletterPage>,  action: newsletterAction}
  
    ]
  
  }

])


const App = () => {

  return (
    
    <RouterProvider router={router}></RouterProvider>

  )
  
}

export default App
