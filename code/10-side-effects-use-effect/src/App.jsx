import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// mandamos el stores id que recibe el json parse para hacer el localstorage, se hacel el getItem de la clave que es selectedPlaces y un array vacio
const storesId = JSON.parse(localStorage.getItem("selectedPlaces") || [])

// stored de los lugares
// de la anterior variable hacemos el mapeo de una funcion que recibe el id
const storedPlaces = storesId.map((id) => 
    
  // mandamos el archivo js con el metodo find, le mandamos una funcion que recibe el id
  // a esa misma funcion le damos el dia y que sea igual al id del primer argumento
  AVAILABLE_PLACES.find((place) => place.id === id)
  
)

function App() {

  // ref de seleccionar el lugar
  const selectedPlace = useRef();
  
  // mandamos el estado de si esta abierto el modal
  // lo inicializamos en falso
  const [modalIsOpen, setModalIsOpen] = useState(false)

  // mandamos otro estadp de si estan los lugares con un array vacio
  const [availabelPlaces, setAvailabelPlaces] = useState([])

  // y otro estado para los lugares elegidos y recibe el stored pasado
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  // hacemos un efecto porque estamos utilizando una propiedad EXTERNA
  useEffect(() => {
    
    // forma de pedir que el navegador solicite la ubicacion
    navigator.geolocation.getCurrentPosition((position) => {
      
      // mandamos la variable de los lugares
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude)
      
      // mandamos el segundo estado que recibe la variable de que esta todo configurado
      setAvailabelPlaces(sortedPlaces)
    
    })
  
    // sin dependencia
  }, [])
  
  // poner el lugar que ya se visito, removerlo 
  // le damos el id como argumento
  function handleStartRemovePlace(id) {

    // damos el segundo argumento con true , lo cambiamos a true
    setModalIsOpen(true)

    // y el seleccionar el lugar que viene del current es igual al id
    selectedPlace.current = id;
  
  }

  // poner el lugar que ya se visito, decir que no lo quiero remover
  
  function handleStopRemovePlace() {
    
    // el segundo estado en falso
    setModalIsOpen(false)
  
  }

  // seleccionar un lugar, recibe el id
  function handleSelectPlace(id) {

    // el segundo estado manda una funcion
    setPickedPlaces((prevPickedPlaces) => {
      
      // si la funcion que se manda le damos el metodo some
      //  ejecuta la función callback una vez por cada elemento presente en el array hasta que encuentre uno donde callback retorna un valor verdadero (true)
      // le mandamos una funcion que esa misma funcion que viene del id sea igual al id del primer argumento
      if (prevPickedPlaces.some((place) => place.id === id)) {
        
        // retornamos esa funcion
        return prevPickedPlaces;
    
      }
      
      // variable del lugar es igual al archivo de js con el metodo find, esa misma funcion que viene del id sea igual al id del primer argumento
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      
      // retornamos el lugar y la copia de la funcion anterior como array
      return [place, ...prevPickedPlaces];
    
    });

    // el id de los stores
    // el json parse del local storage que manda el getItem con la clave por defecto con array vacio
    const storesId = JSON.parse(localStorage.getItem("selectedPlaces") || [])

    // si esos stores con el metodo indexOf
    // El método indexOf() devuelve el índice
    // que recibe el id es igual a -1
    if(storesId.indexOf(id) === -1) {
      
      // mandamos el localStorage que manda el setItem, con la clave y el hacer el objeto string, mandamos como array el id y la copia de los stores
      localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storesId]))

    }

  }

  // removerlo de visitado
  // en este casoo utilizamos el useCallback por el tema que si tenemos la dependencia del archivo DeleteConfirmation

  const handleRemovePlace = useCallback(function handleRemovePlace() {

    // el segundo estado le mandamos una funcion
    setPickedPlaces((prevPickedPlaces) =>

    // a esa misma funcion le aplicamos el filter, le mandamos un array, flecha, que esa misma funcion que viene con el id
    // es diferente a seleccionar del current
    prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    
    );
    
    //setModalIsOpen(false)

    // el id de los stores
    // el json parse del local storage que manda el getItem con la clave por defecto con array vacio

    const storesId = JSON.parse(localStorage.getItem("selectedPlaces") || [])

    // mandamos el localStorage que manda el setItem, con la clave 
    // y el hacer el objeto string, mandamos que los stores le aplicamos el filter que recibe una funcion
    // y flecha, el id (la funcion) sea diferente a seleccionar del current
    localStorage.setItem("selectedPlaces", JSON.stringify(storesId.filter((id) => id !== selectedPlace.current)))

    // sin dependencia
  }, [])

  return (
    
    <>
      
      { /* Mandamos el modal conn el open que es el primer estado */ }

      <Modal open={modalIsOpen}>

      { /* Mandamos la confirmacion de eliminar con el cancel que recibe la de stop y de confirmar que se remueva */ }

        <DeleteConfirmation
    
          onCancel={handleStopRemovePlace}
          
          onConfirm={handleRemovePlace}
        
        />
      
      </Modal>

      <header>
      
        <img src={logoImg} alt="Stylized globe" />
      
        <h1>PlacePicker</h1>
      
        <p>
      
          Create your personal collection of places you would like to visit or
      
          you have visited.
      
        </p>
      
      </header>
      
      <main>

        { /* Los lugares, con su propiedades places damos el que se muestren los ya visitados y el que se pueda remover al seleccionarlo  */ }

        <Places
      
          title="I'd like to visit ..."
          
          fallbackText={'Select the places you would like to visit below.'}
          
          places={pickedPlaces}
          
          onSelectPlace={handleStartRemovePlace}
        
        />

        { /* Los lugares, con su propiedades places damos el que se muestren todos y el que se pueda seleccionar la imagen y suba a los visitados */}
        
        <Places
        
          title="Available Places"
          
          places={availabelPlaces}
          
          fallbackText="Sorting places by distance..."
          
          onSelectPlace={handleSelectPlace}
        
        />
      
      </main>
    
    </>
  
  );

}

export default App;
