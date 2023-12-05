import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {

  // Envia un peticion http

  const { data, isPending, isError, error } = useQuery({

    // cada peticion tiene que tener una key, almacenar en cache y pueda ser reutilizada
    queryKey: ["events"],
    
    // se define el codigo de la peticion
    queryFn: fetchEvents,
    
    // controla el tiempo dee una peticion de datos encontrados, (no se envian peticiones incesarias)
    staleTime: 5000,

    // controla el tiempo de datos y cache, (solo se mantienen ese tiempo en el cache)
    //gcTime: 1000, 

  })
  
  let content;

  if (isPending) {
    
    content = <LoadingIndicator />;
  
  }

  if (isError) {
    
    content = (
    
      <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fecth events"} />
    
    );
  
  }

  if (data) {

    content = (
    
      <ul className="events-list">
      
        {data.map((event) => (
      
        <li key={event.id}>
        
            <EventItem event={event} />
        
          </li>
        
        ))}
      
      </ul>
    
    );
  
  }

  return (
  
    <section className="content-section" id="new-events-section">
    
      <header>
    
        <h2>Recently added events</h2>
    
      </header>
    
      {content}
    
    </section>
  
  );

}
