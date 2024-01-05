"use client"
import { useState } from "react"
import UserProfile from "../../../components/UserProfile"
import TabsProfile from "../../../components/layout/TabsProfile"
import Link from "next/link"
import Right from "../../../components/icons/Right"
import {redirect} from "next/navigation"
import Image from "../../../components/EditableImage"

export default function NewMenuItemPage() {

    const [image, setImage] = useState("")

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [basePrice, setBasePrice] = useState("")

    const [redirectSubmit, setRedirectSubmit] = useState(false)

    async function handleFormSubmit(ev) {
        
        ev.preventDefault()

        const data = {image, name, description, basePrice}

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

    if(profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8">
            
            <TabsProfile admin={true}></TabsProfile>

            <div className="bg-white pt-2 rounded-2xl">

            <form className="mt-8 max-w-xl  mx-auto" onSubmit={handleFormSubmit}>
                
                <div className="flex gap-2 items-end">

                    <div className="grow">

                        <label className="text-gray-900 text-md uppercase">Name</label>
        
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)}></input>

                        <label className="text-gray-900 text-md uppercase">Description</label>
        
                        <input type="text" value={description} onChange={ev => setDescription(ev.target.value)}></input>

                        <label className="text-gray-900 text-md uppercase">Base Price</label>
        
                        <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}></input>

                        <div className="flex flex-col gap-3">

                            <label className="text-gray-900 text-md uppercase">Image</label>
        
                            <Image link={image} setLink={setImage}></Image>

                        </div>

                        <button className="bg-primary text-white border-none mb-8" type="submit">Save</button>

                        <div className="flex justify-center bg-tercer max-w-sm mx-auto p-3 rounded-lg gap-3 mb-4">

                            <Link href={"/menu-items"} className="font-semibold text-xl text-black">

                                <p>Show All Menu Items</p>

                            </Link>

                            <Right></Right>

                        </div>
            
                    </div>

                </div>

            </form>

            </div>

        </section>
        
    )

}