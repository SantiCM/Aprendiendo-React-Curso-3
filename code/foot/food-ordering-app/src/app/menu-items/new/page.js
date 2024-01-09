"use client"
import { useState } from "react"
import UserProfile from "../../../components/reutizable/UserProfile"
import TabsProfile from "../../../components/layout/TabsProfile"
import {redirect} from "next/navigation"
import InputForm from "../../../components/reutizable/InputForm"

export default function NewMenuItemPage() {

    //const [newMenuItem, setNewMenuItem] = useState(null)

    const [redirectSubmit, setRedirectSubmit] = useState(false)

    async function handleFormSubmit(ev, data) {
        
        ev.preventDefault()

        const response = await fetch("/api/menu-items", {
        
            method: "POST",

            body: JSON.stringify(data),

            headers: { "Content-Type": "application/json" }
        
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

    if(!profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8">
            
            <TabsProfile admin={true}></TabsProfile>

            <div className="bg-white pt-2 rounded-2xl">

                <InputForm onSubmit={handleFormSubmit}></InputForm>

            </div>

        </section>
        
    )

}