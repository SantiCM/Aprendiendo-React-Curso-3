"use client"
import { useEffect, useState } from "react";
import TabsProfile from "../../../components/layout/TabsProfile";
import UserInputForm from "../../../components/reutizable/UserInputForm";
import UserProfile from "../../../components/reutizable/UserProfile";
import { useParams } from "next/navigation";

export default function EditPageUsers() {
    
    const [user, setUser] = useState(null)

    const { id } = useParams()

    const { data: dataUsers, loanding: loandingUsers } = UserProfile()

    useEffect(() => {

        fetch("/api/profile?_id="+id).then(response => {
            
            response.json().then(user => {

                setUser(user)
            
            })
        
        })
      
    }, [])

    async function handleSave(data, ev) {
    
        ev.preventDefault()

        fetch("/api/profile", {
        
            method: "PUT",
            
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify( { ...data, _id:id } )
        
        })

    }
    
    if(loandingUsers) {
        
        return "Loanding User Info"
        
    }

    if(!dataUsers.admin) {
        
        return "Not An Admin"
        
    }

    return (
        
        <section className="max-w-2xl mt-8 mx-auto">
            
            <TabsProfile admin={true}></TabsProfile>

            <div className="mt-8">

                <UserInputForm user={user} onSave={handleSave}></UserInputForm>

            </div>

        </section>
        
    )

}