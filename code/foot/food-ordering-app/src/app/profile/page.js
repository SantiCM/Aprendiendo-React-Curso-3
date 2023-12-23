"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage(){

    const session = useSession()

    const [userName, setUserName] = useState("")

    const {status} = session

    useEffect(() => {
      
        if(status === "authenticated") {
            
            setUserName(session.data.user.name)
        
        }
      
    }, [status, session])
    

    async function handleProfileInfo(ev) {
        
        ev.preventDefault()

        const response = await fetch("/api/profile", {
        
            method: "PUT",

            headers: { "Content-Type": "application/json" },

            body:JSON.stringify({name: userName})
            
        })

    }

    if(status === "loading") {
        
        return "Loanding.."
    
    }

    if(status === "unauthenticated") {
        
       return redirect("/login")
    
    }

    const userImage = session.data?.user?.image

    return (
        
        <section className="mt-8 bg-formprofile h-80">

            <h1 className="text-center text-primary text-4xl pt-4">Profile</h1>

            <div className="max-w-md mx-auto mt-4">

                <div className="flex gap-4 items-center">

                    <div>

                        <div className="relative rounded-lg p-2">

                            <Image className="rounded-md w-full h-full mb-1" src={userImage} width={250} height={250}></Image>

                        </div>

                        <button type="button">Edit</button>

                    </div>
                
                    <form className="grow " onSubmit={handleProfileInfo}>

                        <input 
                        
                            type="text" placeholder="Please enter your full name" 
                            value={userName} onChange={ev => setUserName(ev.target.value)}
                        
                        ></input>

                        <input type="email" disabled={true} value={session.data.user.email}></input>

                        <button className="bg-primary text-white" type="submit">Save</button>

                    </form>

                </div>

            </div> 
         
        </section>
    
    )

}