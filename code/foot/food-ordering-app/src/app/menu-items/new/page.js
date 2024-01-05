"use client"
import { useState } from "react"
import UserProfile from "../../../components/UserProfile"
import TabsProfile from "../../../components/layout/TabsProfile"
import Link from "next/link"
import Right from "../../../components/icons/Right"
import {redirect} from "next/navigation"

export default function NewMenuItemPage() {

    const [images, setImages] = useState("")

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [basePrice, setBasePrice] = useState("")

    const [redirectSubmit, setRedirectSubmit] = useState(false)

    const [loanding, setLoanding] = useState(false)

    const cssLabel = "text-gray-900 text-md uppercase"
  
    async function handleFile(ev) {
    
        const files = ev.target.files

        const data = new FormData()

        data.append("file", files[0])

        data.append("upload_preset", "images")

        setLoanding(true)

        const response = await fetch(
      
            "https://api.cloudinary.com/v1_1/dqprmrwka/image/upload",

            {
        
                method: "POST", body: data
      
            }
      
        )

        const file = await response.json()

        console.log(response)

        setImages(file.secure_url)

        console.log(file)

        setLoanding(false)
    
    }

    async function handleFormSubmit(ev) {
        
        ev.preventDefault()

        const data = {images, name, description, basePrice}

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

                        <label className={cssLabel}>Name</label>
        
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)}></input>

                        <label className={cssLabel}>Description</label>
        
                        <input type="text" value={description} onChange={ev => setDescription(ev.target.value)}></input>

                        <label className={cssLabel}>Base Price</label>
        
                        <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}></input>
                        
                        <label className={cssLabel}>Image</label>

                        <div className="relative bg-gray-200 rounded-md p-2">

                            <input type="file"  onChange={handleFile}/>

                            <span className="block text-2xl text-black cursor-pointer">Edit</span>

                        </div>

                        {!images && (
                                
                                <div className="bg-bgform p-2 mt-3 flex justify-center mb-4 rounded-md">

                                    <p className="text-xl">No Image Select</p>

                                </div>
                                
                            )}

                            {loanding ? <h3 className="text-center font-semibold text-xl">Loanding...</h3> : images && <img className="w-full h-full" src={images}></img>}
                            
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