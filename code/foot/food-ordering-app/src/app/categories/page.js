"use client"
import { useState } from "react";
import TabsProfile from "../../components/layout/TabsProfile";
import UserProfile from "../../components/UserProfile";

export default function CategoriesPage(){

    const [newCategoryName, setNewCategoryName] = useState("")

    const { data: profileData , loanding: profileLoanding } = UserProfile()

    async function handleNewCategory(ev) {
        
        ev.preventDefault()

        const response = await fetch("/api/categories", {  

            method: "POST",
    
            headers: { "Content-Type": "application/json" },
                
            body: JSON.stringify( { name: newCategoryName } ), 
            
        })

    }

    if(profileLoanding) {
        
        return "Loanding User Info..."
    
    }

    if(profileData.admin) {
        
        return "Not And Admin"
    
    }
    
    return (

        <section className="mt-8 max-w-lg mx-auto">

            <TabsProfile admin={true}></TabsProfile>

            <form className="mt-9" onSubmit={handleNewCategory}>

                <div className="flex gap-3 items-end">

                    <div className="grow">

                        <label className="text-gray-900 text-md uppercase">New Category Name</label>

                        <input 
                        
                            type="text"

                            value={newCategoryName}

                            onChange={ev => setNewCategoryName(ev.target.value)}
                            
                        ></input>

                    </div>

                    <div className="pb-3">

                        <button className="bg-secondary  text-white border-none" type="submit">Create</button>

                    </div>

                </div>

            </form>

        </section>
           
    )

}