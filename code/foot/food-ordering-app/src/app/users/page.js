"use client"
import { useEffect, useState } from "react";
import TabsProfile from "../../components/layout/TabsProfile";
import UserProfile from "../../components/reutizable/UserProfile";
import EditIcon from '@mui/icons-material/Edit';


export default function Users() {
    
    const [users, setUsers] = useState([])

    const { data: dataOrders, loanding: loandingOrders } = UserProfile()

    useEffect(() => {

        fetch("/api/users").then(response => {
        
            response.json().then(users => {
                
                setUsers(users)
            
            })

        })
      
    }, [])
    

    if(loandingOrders) {
        
        return "Loanding User Info"
        
    }

    if(dataOrders.admin) {
        
        return "Not An Admin"
        
    }

    return (
        
        <section className="mt-8 max-w-2xl mx-auto">
            
            <TabsProfile admin={true}></TabsProfile>

            <div>

                {users?.length > 0 && users.map((text) => (
                    
                    <div className="bg-white rounded-md mb-2 p-3 flex gap-4 justify-center">

                        <span className="text-lg font-bold">{text.name}</span>

                        <span className="text-lg text-blue-500 font-bold">{text.email}</span>               

                        <div className="">

                            <button><EditIcon></EditIcon></button>

                        </div>

                    </div>

                    
                ))}

            </div>

        </section>
        
    )

}