import { useEffect, useState } from "react"

export default function UserProfile() {

    const [data, setData] = useState(false)

    const [loanding, setLoanding] = useState(true)

    useEffect(() => {

        fetch("/api/profile").then(response => {
        
            response.json().then(data => {
                
                setData(data.admin)

                setLoanding(false)
            
            })

        })
      
    }, [])

    return {
        
        data, loanding
    
    }

}