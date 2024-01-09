import { useEffect, useState } from "react"

// profile
export default function UserProfile() {

    // recojemos la data, en estado en falso
    const [data, setData] = useState(false)

    // el loanding en true 
    const [loanding, setLoanding] = useState(true)

    // efecto
    useEffect(() => {

        // peticion de api, profile, damos el then de la res
        fetch("/api/profile").then(response => {
            
            // recojemos la res, la volvemos json, damos la data 
            response.json().then(data => {

                // la data del segundo estado, damos la data del admin
                setData(data)

                // y el cargar del segundo estado en falso
                setLoanding(false)
            
            })

        })
      
    }, [])

    // retornamos la data y el loanding
    return {
        
        data, loanding
    
    }

}