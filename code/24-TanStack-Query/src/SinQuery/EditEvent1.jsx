import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { redirect, useNavigate, useNavigation, useParams, useSubmit } from 'react-router-dom';

export default function EditEvent1() {
  
  const navigate = useNavigate();

  const submit = useSubmit()

  const {state} = useNavigation()

  const params = useParams()

  const { data,isError, error } = useQuery({
  
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
    
    submit(formData, { method: "PUT∂" })

  }

  function handleClose() {
    
    navigate('../');
  
  }

  let content

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

      {state === "submitting" ? <p>Seeding data...</p> : (

        <>  

          <Link to="../" className="button-text">
          
            Cancel
        
          </Link>
        
          <button type="submit" className="button">
          
            Update
        
          </button>
        
        </>
    
      )}
      
    </EventForm>
    
    </>
  
  )}

  return (
    
    <Modal onClose={handleClose}>
      
      {content}
    
    </Modal>
  
  );

}

export const Loader = ( { params } ) => {

    // desencadenar una consulta mediante programacion
    return queryClient.fetchQuery({
  
      queryKey: ["events", params.id],
  
      queryFn: (signal) => fetchEvent({signal, id: params.id})
    
    })
  
}

export const Action = async( { request, params } ) => {

    const formData = await request.formData()

    const updatedEventData = Object.fromEntries(formData)

    await updateEvent( { id: params.id, event: updatedEventData } )

    await queryClient.invalidateQueries(["events"])

    return redirect("../")

}