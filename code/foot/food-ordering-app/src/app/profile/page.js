"use client"
import { useSession } from "next-auth/react"
import TabsProfile from "../../components/layout/TabsProfile"
import UserInputForm from "../../components/reutizable/UserInputForm"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage(){

    const [profileFetch, setProfileFetch] = useState(false)

    const [admin, setAdmin] = useState(false)

    const [user, setUser] = useState(null)

    const session = useSession()

    const {status} = session

    const [saved, setSaved] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
      
        if(status === "authenticated") {
            
            fetch("/api/profile").then(response => {
                
                response.json().then(data => {
                    
                    setUser(data)

                    setAdmin(data.admin)
                    
                    setProfileFetch(true)
                    
                })
            
            })
        
        }
      
    }, [status, session])
    

    async function handleProfileInfo(ev, data) {

        setSaved(false)

        setIsSaving(true)
        
        ev.preventDefault()

        const response = await fetch("/api/profile", {
        
            method: "PUT",
    
            headers: { "Content-Type": "application/json" },
    
            body: JSON.stringify(data)
                
        })

        setIsSaving(false)

        if(response.ok) {
        
            setSaved(true)
        
        }

    }


    if(status === "loading" || !profileFetch) {
        
        return "Loanding.."
    
    }

    if(status === "unauthenticated") {
        
       return redirect("/login")
    
    }

    return (
        
        <section className="mt-8">
            
            <TabsProfile admin={admin}></TabsProfile>

            <div className="max-w-screen-sm mx-auto flex justify-center m-3">

                {saved && (

                    <div className="bg-green-200 rounded-lg text-xl p-2">Profile Saved!</div>

                )}

            </div>
            
            {isSaving && (
                
                <div className="rounded-lg text-xl p-2 text-center">Saving......</div>
                
            )}

            <div className="bg-white pt-5 rounded-3xl">

            <div className="max-w-md mx-auto">

                <div className="grid">

                    <UserInputForm user={user} onSave={handleProfileInfo}></UserInputForm>
                    
                </div>

            </div> 

            </div>
         
        </section>
    
    )

}