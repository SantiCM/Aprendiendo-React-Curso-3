import { Link, useNavigate } from 'react-router-dom';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';


export default function NewEvent() {

  const navigate = useNavigate();

  // mutate: enviar la solicitud como tal
  const { mutate, isPending, isError, error } = useMutation({
    
    mutationFn: createNewEvent, 

    // metodo para hacer una accion si la mutacion pasoooo
    onSuccess: () => {

      // invalidar consultas
      // se ponen obsoletos 
      // esto invalidara todas las query de la clave
      queryClient.invalidateQueries({queryKey: ["events"]})
      
      navigate("/events")
      
    }
  
  })

  function handleSubmit(formData) {
  
    // asegurarse que los datos se envian correctamente
    mutate({event: formData})

    navigate()
  
  }

  return (
   
    <Modal onClose={() => navigate('../')}>
    
      <EventForm onSubmit={handleSubmit}>

        {
        
          isPending && "Submitting....."
        
        }

        {

          !isPending && (
            
            <>
    
            <Link to="../" className="button-text">
      
              Cancel
      
            </Link>
      
            <button type="submit" className="button">
      
              Create
      
            </button>
      
          </>
          
            )
        
        }
  
    
      </EventForm>

      {isError && (
      
        <ErrorBlock 
        
          title="Failed to create event" 
          
          message={error.info?.message || "Failed to create event, check to inputs"}
          
        >

        </ErrorBlock>
        
      )}
    
    </Modal>
  
  );

}