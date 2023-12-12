import { useEffect, useState } from "react"

// componente que muestra el progreso de el tiempo que se tiene para decidir si o no
// damos el timer 
export const ProgressBar = ({timer}) => {
    
  // mandamos el estado que recibe el timer de arriba
  const [remainingTime, setRemainingTime] = useState(timer)

  // mandamos un effecto
  useEffect(() => {
      
    // donde mandamos el interval
    const interval = setInterval(() => { 
      
      // que el segundo estado hace una funcion y esa funcion se le resta 10 
      setRemainingTime((prevTime) => prevTime - 10)
      
    }, 10)
    
    // hacemos la limpieza del interval
    return () => {
      
      clearInterval(interval)
      
    }
  
  }, [])

  // mandamos el progress con su valor que es el primer estado y lo maximo que llega es al timer
  return <progress value={remainingTime} max={timer}></progress>

}
