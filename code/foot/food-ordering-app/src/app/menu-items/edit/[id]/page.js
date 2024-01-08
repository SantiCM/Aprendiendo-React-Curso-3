"use client"
import { useEffect, useState } from "react"
import UserProfile from "../../../../components/reutizable/UserProfile"
import TabsProfile from "../../../../components/layout/TabsProfile"
import InputForm from "../../../../components/reutizable/InputForm"
import DeleteButton from "../../../../components/reutizable/DeleteButton"
import {redirect, useParams} from "next/navigation"

export default function EditMenuItemPage() {

    // recojemos el id de los params 
    const { id } = useParams()

    // damos un estado del item en nulo
    const [menuItem, setMenuItem] = useState(null)

    // damos el esatdo de a la hora de mandar algo nos redireccione a una pagina
    // se inicializa en falso porque no hay ninguna accion al principio
    const [redirectSubmit, setRedirectSubmit] = useState(false)

    // damos un efecto
    useEffect(() => {

        // donde el fetch viene de la api del menu, le damos el then, damos la res
        // esto es para editar el menu
        fetch("/api/menu-items").then(response => {

            // la res la volvemos json, damos el then, damos el argumento
            response.json().then(items => {
                   
                // el item es, los items de arriba le damos el find, el cual es el que hace que en un arreglo
                // se encuente el primer array que cumpla
                // entonces damos el item, si ese item del id. es igual al id de los params
                const item = items.find(item => item._id === id)

                // damos el segundo estado el item
                setMenuItem(item)

            })
        
        })
    
    }, [])
    
    // submit 
    async function handleFormSubmit(ev, data) {

        // prevenimos 
        ev.preventDefault()

        // la data de arriba es la copia de esa data y el _id es el id de los params
        data = { ...data, _id: id }

        // la res el fetch de los items
        const response = await fetch("/api/menu-items", {
            
            // metodo put, editar
            method: "PUT",

            // el body que mostraremos sera el json que lo volvemos string, la data
            body: JSON.stringify(data),

            // header clasico
            headers: { "Content-Type": "application/json" }
        
        })

        // mostramos en pantalla
        setRedirectSubmit(true)
    
    }

    // boton de eliminar
    async function handleDelete() {
        
        // recojemos la res del await del fetch del api de menu "?" si viene damos el 
        // _id (de mongo) + el id de params
         const response = await fetch("/api/menu-items?_id="+id, {
            
            // metodo DELETE
            method: "DELETE",
        
        })

        // nos redireccionamos a la hora de eliminar
        setRedirectSubmit(true)
    
    }

    // si pasa el submit
    if(redirectSubmit) {
        
        // retornamos el redirect a menu-items
        return redirect("/menu-items")
    
    }

    // recojemos la data y el loanding del profile
    const { data: profileData , loanding: profileLoanding } = UserProfile()

    // si pasa el loanding, damos el retornar
    if(profileLoanding) {
        
        return "Loanding User Info..."
    
    }

    // si la data del admin es falso, damos el retorno
    if(profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8">
            
            <TabsProfile admin={true}></TabsProfile>

            <div className="bg-white pt-1 rounded-2xl">

                <InputForm menuItem={menuItem} onSubmit={handleFormSubmit}></InputForm>

                <div className="text-xl bg-red-500 max-w-sm  mx-auto rounded-2xl">

                    <DeleteButton label="Delete this menu" onDelete={handleDelete}>

                    </DeleteButton>

                </div>

            </div>

        </section>
        
    )

}