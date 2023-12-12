import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  
  const navigate = useNavigate();

  const params = useParams()

  const { data, isPending, isError, error } = useQuery({
  
    queryKey: ["events", params.id],

    queryFn: (signal) => fetchEvent({signal, id: params.id})
  
  })

  const { mutate } = useMutation({
  
    mutationFn: updateEvent,

    // se ejecutara justo despues de mutar
    onMutate: async (data) => {

      const newEvent = data.event

      // cancelar consultas, asegurar que si tuvieramos cualquier consulta saliente para esta clave
      // esas se cancelan y no chocan
      await queryClient.cancelQueries({queryKey: ["events", params.id]})

      // nos da los datos de consulta almacenada
      const prevEvent = queryClient.getQueriesData(["events", params.id])

      // manipular los datos ya almacenados sin esperar respuesta
      //                     la clave
      queryClient.setQueryData(["events", params.id], newEvent)

      // retornar objeto
      return {prevEvent}
    
    },

    // si la mutacion de actualizacion falla
    onError: ( error, data, context ) => {

      queryClient.setQueryData(["events", params.id], context.prevEvent)

    },

    // se llama si la mutacion salio o no
    onSettled: () => {

     queryClient.invalidateQueries(["events", params.id])

    },
  
  })

  function handleSubmit(formData) {
    
    mutate( { id: params.id, event: formData} )

    navigate('../');
    
  }

  function handleClose() {
    
    navigate('../');
  
  }

  let content

  if(isPending) {
    
    content = ( <div className='center'>

      <LoadingIndicator></LoadingIndicator>

    </div>
  
  )}

  if(isError) {
  
    content = (<>

      <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to load event. Please check your inputs and try again"}></ErrorBlock>

      <div className='form-actions'>

        <Link to="../" className='button'>

          Okay

        </Link>

      </div>
    
    </>
  
  )}

  if(data) {
    
    content = ( <>
    
    <EventForm inputData={data} onSubmit={handleSubmit}>
        
      <Link to="../" className="button-text">
          
        Cancel
        
      </Link>
        
      <button type="submit" className="button">
          
        Update
        
      </button>
      
    </EventForm>
    
    </>
  
  )}

  return (
    
    <Modal onClose={handleClose}>
      
      {content}
    
    </Modal>
  
  );

}