import { useEffect} from "react";
import { ProgressBar } from "./ProgressBar";

// tiempo que dura el modal
const TIMER = 3000

// eliminar y la confirmacion
// damos el confirmar y el cancelar
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  
  // mandamos un efecto
  useEffect(() => {

    // mandamos el tiempo que es con la propiedad de js
    const timer = setTimeout(() => {
      
      // mandamos el confirmar
      onConfirm()
      
      // y de tiempo, el tiempo incial
    }, TIMER)

    // hacemos limpieza del tiempo
    return () => {
    
      clearTimeout(timer)
    
    }

    // mandamos la dependencia y por consecuencia el useCallback en el App
  }, [onConfirm])


  return (
  
    <div id="delete-confirmation">
    
      <h2>Are you sure?</h2>
    
      <p>Do you really want to remove this place?</p>
    
      <div id="confirmation-actions">
    
        <button onClick={onCancel} className="button-text">
    
          No
    
        </button>
    
        <button onClick={onConfirm} className="button">
    
          Yes
    
        </button>
    
      </div>

      <ProgressBar timer={TIMER}></ProgressBar>
    
    </div>
  
  );

}