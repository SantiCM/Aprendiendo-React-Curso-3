
// le damos las propiedades que necesitamos
export default function Places({ title, places, fallbackText, onSelectPlace }) {
  
  return (
  
    <section className="places-category">
      
      { /* Mandamos el titulo */ }
      <h2>{title}</h2>

      { /* Los lugares si son iguales a 0 mostramos el texto que estan cargando las imagenes */ }

      {places.length === 0 && <p className='fallback-text'>{fallbackText}</p>}

      { /* Los lugares son mayores a 0 */ }

      {places.length > 0 && (

        
        <ul className="places">
          
          { /* Los lugares, los mapeamos, con una funcion */ }

          {places.map((place) => (

            // le damos su key 
            <li key={place.id} className="place-item">
              
              { /* Al hacerle click mandamos una funcion de seleccionar que recibe el lugar con el id  */ }

              <button onClick={() => onSelectPlace(place.id)}>
              
                <img src={place.image.src} alt={place.image.alt} />
            
                <h3>{place.title}</h3>
            
              </button>
            
            </li>
          
          ))}
        
        </ul>
      
      )}
    
    </section>
  
  );

}