"use client"
import Link from "next/link";
import UserProfile from "../../components/reutizable/UserProfile";
import TabsProfile from "../../components/layout/TabsProfile";
import Right from "../../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function Menu() {

    // items del menu como estado y recibe un array vacio
    const [menuItems, setMenuItems] = useState([])

    // recojemos la data y el loanding del profile
    const { data: profileData , loanding: profileLoanding } = UserProfile()

    // variables del css
    const cssText = "text-primary"

    const cssTextItem = "text-black"

    // efecto
    useEffect(() => {
        
        // de la peticion de los items que da la respuesta
        fetch("/api/menu-items").then(response => {
            
            // esa respuesta, la volvemos json, le damos el then, damos el argumento de los items
            response.json().then(menuItems => {
                
                // el segundo estado sera ese argumento de arriba
                setMenuItems(menuItems)
            
            })
        
        })

    }, [])
    
    // si el profile pasa
    if(profileLoanding) {

        // retornamos esto
        return "Loanding User Info..."
    
    }

    // si la data del admin no es, damos ese texto
    if(!profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8 max-w-2xl mx-auto">

            <TabsProfile admin={true}></TabsProfile>

            <div className="mt-8 flex justify-center bg-primary p-3 rounded-lg gap-3">

                <Link className="font-semibold text-xl text-white" href={"/menu-items/new"}
                
                > <p>Create New Menu Item</p>
                    
                </Link>

                <Right></Right>

            </div>

            <div>

                {/*De el primer estado de los items del menu si es mayor a 0, (pasa) damos que ese estado sea mapeado */}

                <h2 className="pt-3 font-bold text-2xl">Edit Menu Item</h2>

                <div className="grid grid-cols-3 gap-6 rounded-md pt-4">

                    {menuItems.length > 0 && menuItems.map((item, index) => (

                        // un link donde la ref es ir al menu-items del edit del id de el item del menu mencionado
                        <Link className="bg-gray-600 p-4" href={"/menu-items/edit/"+item._id}>

                            <div key={index} className="flex justify-center">

                                <Image className="rounded-md" src={item.images} alt="Photo" width={200} height={200}></Image>

                            
                            </div>

                            <div key={index} className="text-center pt-3">

                                <p className="font-bold text-2xl text-white">{item.name}</p>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
        
    )

}