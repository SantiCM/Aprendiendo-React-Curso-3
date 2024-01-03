"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import TabsProfile from "../../components/layout/TabsProfile"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage(){

    const [userName, setUserName] = useState("")

    const [phone, setPhone] = useState("")

    const [streetAddress, setStreetAddress] = useState("")

    const [postalCode, setPostalCode] = useState("")

    const [city, setCity] = useState("")

    const [country, setCountry] = useState("")

    const [profileFetch, setProfileFetch] = useState(false)

    const [admin, setAdmin] = useState(false)

    const session = useSession()

    const {status} = session

    const [saved, setSaved] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
      
        if(status === "authenticated") {
            
            setUserName(session.data.user.name)

            fetch("/api/profile").then(response => {
                
                response.json().then(data => {
                    
                    setPhone(data.phone)
                    
                    setStreetAddress(data.streetAddress)
                    
                    setPostalCode(data.postalCode)
                    
                    setCity(data.city)
                    
                    setCountry (data.country) 
                    
                    setAdmin(data.admin)
                    
                    setProfileFetch(true)
                    
                })
            
            })
        
        }
      
    }, [status, session])
    

    async function handleProfileInfo(ev) {

        setSaved(false)

        setIsSaving(true)
        
        ev.preventDefault()

        const response = await fetch("/api/profile", {
        
            method: "PUT",
    
            headers: { "Content-Type": "application/json" },
    
            body:JSON.stringify({ name: userName, streetAddress, phone, postalCode, city,  country})
                
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

    const userImage = session.data?.user?.image

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

            <div className="max-w-md mx-auto">

                <div className="flex gap-4">

                    <div>

                        <div className="relative rounded-lg p-2">

                            <Image className="rounded-md w-full h-full mb-10" src={userImage} alt="Image User Google" width={250} height={250}></Image>

                        </div>

                    </div>
                
                    <form className="grow" onSubmit={handleProfileInfo}>

                        <input
    
                            type="text"

                            placeholder="Please enter your full name"

                            value={userName}

                            onChange={(ev) => setUserName(ev.target.value)}

                        ></input>

                        <input

                            type="email"

                            disabled={true}

                            value={session.data.user.email}

                        ></input>

                        <input

                            type="tel"

                            placeholder="Phone Number"

                            value={phone}

                            onChange={(ev) => setPhone(ev.target.value)}

                        ></input>

                        <input
    
                            type="text"

                            placeholder="Street address"

                            value={streetAddress}

                            onChange={(ev) => setStreetAddress(ev.target.value)}

                        ></input>

                        <div className="flex gap-2">
    
                            <input
                            
                                type="text"
                            
                                placeholder="City"
                            
                                value={city}
                            
                                onChange={(ev) => setCity(ev.target.value)}
                            
                            ></input>

                            <input
        
                                type="text"
        
                                placeholder="Postal Code"
        
                                value={postalCode}
        
                                onChange={(ev) => setPostalCode(ev.target.value)}

                            ></input>

                        </div>

                        <input
    
                            type="text"
    
                            placeholder="Country"
    
                            value={country}
    
                            onChange={(ev) => setCountry(ev.target.value)}
    
                        ></input>

                        <button className="bg-primary text-white" type="submit">Save</button>

                    </form>

                </div>

            </div> 
         
        </section>
    
    )

}