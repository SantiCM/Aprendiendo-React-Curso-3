"use client"
import { useEffect, useState } from "react";
import TabsProfile from "../../components/layout/TabsProfile";
import UserProfile from "../../components/reutizable/UserProfile";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function CategoriesPage(){

    // estado del nombre de la categoria
    const [categoryName, setCategoryName] = useState("")

    // las categorias, las damos el state como arreglo vacio
    const [categories, setCategories] = useState([])

    // editar, el estado en nulo
    const [edited, setEdited] = useState(null)

    // recojemos el profile, de la data y el loanding
    const { data: profileData , loanding: profileLoanding } = UserProfile()

    // efecto de las categorias
    useEffect(() => {
      
        fetchCategories()

    }, [])


    async function fetchCategories() {
        
        // recojemos el await del fetch de api, de las categorias, damos el then, damos la res
        const response =  await fetch("/api/categories").then(response => {
            
            // recojemos la res, la volvemos json
            // damos las categories
            response.json().then(categories => {
                
                // el segundo estado (el del arreglo vacio )
                // damos las categories de la res
                setCategories(categories)
            
            })
        
        })
    
    }
    
    // nueva categoria, damos el ev
    async function handleNewCategory(ev) {

        // prevenimos
        ev.preventDefault()

        // recojemos la data, damos el name, de la categoria del estado
        const data = { name: categoryName }

        // si se edita
        if(edited) {

            // recojemos la data del id de mongo
            // y el editar tiene que ser tambien del _id 
            data._id = edited._id
        
        }

        // await fetch de la api de categorias
        const response = await fetch("/api/categories", {  

            // el metodo si es editar es put sino es postear
            method: edited ? "PUT" : "POST",
            
            // headers clasico
            headers: { "Content-Type": "application/json" },

            // el body es volver la res, a strring, y damos la data
            body: JSON.stringify(data), 
            
        })

        // al momento de pasar, damos las categorias en ""
        setCategoryName("")

        // actualizamos
        fetchCategories()

        // editar en nulo
        setEdited(null)

    }

    // eliminar, damos el _id
    async function handleDelete(_id) {

        // recojemos la res del fetch de la api, de las categories, "?"
        // si viene damos el _id que sea (=) mas el _id
        const response = await fetch("/api/categories?_id="+_id, {

            // metodo eliminar
            method: "DELETE",
        })

        // actualizamos 
        fetchCategories()

    }

    if(profileLoanding) {
        
        return "Loanding User Info..."
    
    }

    if(!profileData.admin) {
        
        return "Not And Admin"
    
    }
    
    return (

        <section className="mt-8 max-w-lg mx-auto">

            <TabsProfile admin={true}></TabsProfile>

            {/* Damos el submit de la peticion */}
            <form className="mt-9" onSubmit={handleNewCategory}>

                <div className="flex gap-3 items-end">

                    <div className="grow">

                        <label className="text-gray-900 text-md uppercase">

                            {/* Si e edita damos el pasar, si no, damos este texto */}
                            {edited ? "Update Category" : "New Category Name"}

                            {/* Si se edita, y pasa, damos el name */}
                            {edited && (
                                
                                <>

                                    : <b className="text-red-600">{edited.name}</b>

                                </>         

                            )}

                        </label>

                        <input 
                        
                            type="text"
                            
                            // valor de la categoria 
                            value={categoryName}

                            // change, del ev de el segundo estado de la ev, de target, del valor
                            onChange={ev => setCategoryName(ev.target.value)}
                            
                        ></input>

                    </div>

                    <div className="pb-3 flex gap-4">

                        <button className="bg-secondary  text-white border-none" type="submit">
                                
                            {/* Si se edita damos el texto, si no damos otro texto */}
                            {edited ? "Update" : "Create" }

                        </button>

                        <button 
                        
                            className="bg-red-500  text-white border-none" type="button"
                            
                            // al hacer click
                            onClick={() => {

                                // el editar en nulo
                                setEdited(null); 

                                // la categoria como arreglo vacio
                                setCategoryName("")
                            }}
                            
                        >  Cancel

                        </button>

                    </div>

                </div>

            </form>

            <div>

                <h2 className="mb-2 text-xl pl-2 text-black">Existing Categories</h2> 
                            
                {/* Si las categorias son mayor a 0, damos el mapeo de las categories */}
                {categories?.length > 0 && categories.map((text, index) => (
                    
                    <div key={index} className="bg-white rounded-lg flex p-2 items-center cursor-pointer uppercase m-2">

                        <div className="grow">

                            {/* recojemos el name */}
                            <p className="font-bold text-primary text-xl pl-2">{text.name}</p>

                        </div>

                        <div className="flex">

                            <button onClick={() => {

                                // el editar , damos el text
                                setEdited(text)

                                // la categoria damos el name
                                setCategoryName(text.name)
                    
                            }} className="border-none text-xl text-black gap-3"

                            > <EditIcon></EditIcon>
                
                            </button>
                            
                            <button className="text-red-500" onClick={() => handleDelete(text._id)}><DeleteIcon></DeleteIcon></button>
                            
                        </div>

                    </div>

                ))}

            </div>

        </section>
           
    )

}