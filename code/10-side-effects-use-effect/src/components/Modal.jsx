import {  useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Un modal diferente

// recibe el children y el open
const Modal = ({ children, open })  => {

  // mandamos el dialog del ref
  const dialog = useRef();
  
  // mandamos un efecto
  useEffect(() => {
    
    // si esta abierto
    if(open) {
      
      // mostramos el modal
      dialog.current.showModal()
     
      // si no
    } else {
      
      // lo cerramos
      dialog.current.close()
    
    }
    
    // damos como dependecia el open
  }, [open])
  

  // retornamos el createPortal para hacer mas facil el manejo del dialog
  return createPortal(

    // damos el dialog con su ref
    <dialog className="modal" ref={dialog}>
      
      { /* Si esta abierto mostramos el contenido si no nulo */ }

      {open ? children : null}
    
    </dialog>,

    
    // OBLIGATORIO PARA EL createPortal
    document.getElementById('modal')
  
  );

};

export default Modal;
