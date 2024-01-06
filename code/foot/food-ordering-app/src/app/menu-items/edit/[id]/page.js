"use client"
import { useEffect, useState } from "react"
import UserProfile from "../../../../components/reutizable/UserProfile"
import TabsProfile from "../../../../components/layout/TabsProfile"
import InputForm from "../../../../components/reutizable/InputForm"
import {redirect, useParams} from "next/navigation"

export default function EditMenuItemPage() {

    const { id } = useParams()

    const [menuItem, setMenuItem] = useState(null)

    const [redirectSubmit, setRedirectSubmit] = useState(false)

    useEffect(() => {
        
        fetch("/api/menu-items").then(response => {
            
            response.json().then(items => {
                
                const item = items.find(item => item._id === id)

               setMenuItem(item)

            })
        
        })
    
    }, [])
    

    async function handleFormSubmit(ev, data) {
        
        ev.preventDefault()

        data = { ...data, _id: id }

        const response = await fetch("/api/menu-items", {
        
            method: "PUT",

            body: JSON.stringify(data),

            headers: { "Content-Type": "application/json" }
        
        })

        setRedirectSubmit(true)
    
    }

    async function handleDelete() {
        
        const response = await fetch("/api/menu-items?_id="+id, {
            
            method: "DELETE",
        
        })

        setRedirectSubmit(true)
    
    }

    if(redirectSubmit) {
        
        return redirect("/menu-items")
    
    }

    const { data: profileData , loanding: profileLoanding } = UserProfile()

    if(profileLoanding) {
        
        return "Loanding User Info..."
    
    }

    if(profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8">
            
            <TabsProfile admin={true}></TabsProfile>

            <div className="bg-white pt-2 rounded-2xl">

                <InputForm menuItem={menuItem} onSubmit={handleFormSubmit}></InputForm>

                <div className="text-xl bg-red-500 max-w-sm mx-auto rounded-2xl">

                    <button onClick={handleDelete} className="text-white">Delete this menu</button>

                </div>

            </div>

        </section>
        
    )

}