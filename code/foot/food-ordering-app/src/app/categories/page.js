"use client"
import { useEffect, useState } from "react";
import TabsProfile from "../../components/layout/TabsProfile";
import UserProfile from "../../components/UserProfile";

export default function CategoriesPage(){

    const [categoryName, setCategoryName] = useState("")

    const [categories, setCategories] = useState([])

    const [edited, setEdited] = useState(null)

    const { data: profileData , loanding: profileLoanding } = UserProfile()

    useEffect(() => {
      
        fetchCategories()

    }, [])

    function fetchCategories() {
        
        fetch("api/categories").then(response => {
        
            response.json().then(categories => {
            
                setCategories(categories)
            
            })
        
        })
    
    }
    
    async function handleNewCategory(ev) {
        
        ev.preventDefault()

        const data = { name: categoryName }

        if(edited) {
             
            data._id = edited._id
        
        }

        const response = await fetch("/api/categories", {  

            method: edited ? "PUT" : "POST",
    
            headers: { "Content-Type": "application/json" },
                
            body: JSON.stringify(data), 
            
        })

        setCategoryName("")

        fetchCategories()

        setEdited(null)

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

                        <label className="text-gray-900 text-md uppercase">

                            {edited ? "Update Category" : "New Category Name"}

                            {edited && (
                                
                                <>

                                    : <b className="text-red-600">{edited.name}</b>

                                </>         

                            )}

                        </label>

                        <input 
                        
                            type="text"

                            value={categoryName}

                            onChange={ev => setCategoryName(ev.target.value)}
                            
                        ></input>

                    </div>

                    <div className="pb-3">

                        <button className="bg-secondary  text-white border-none" type="submit">
                            
                            {edited ? "Update" : "Create" }

                        </button>

                    </div>

                </div>

            </form>

            <div>

                <h2 className="mb-2 text-lg pl-4 bg-bgform p-2 text-black text-center">Edit Category</h2>

                {categories?.length > 0 && categories.map((text) => (
                    
                    <div className="bg-white rounded-lg p-1 flex mx-auto cursor-pointer uppercase m-2">
        
                        <button onClick={() => {
                            
                            setEdited(text)

                            setCategoryName(text.name)
                            
                        }} className="border-none text-lg text-primary"
                        
                        >
                            
                            {text.name}
                        
                        </button>
 
                    </div>
                    
                ))}

            </div>

        </section>
           
    )

}