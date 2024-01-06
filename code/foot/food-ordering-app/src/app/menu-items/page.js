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
    if(profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8 max-w-md mx-auto">

            <TabsProfile admin={true}></TabsProfile>

            <div className="mt-8 flex justify-center bg-primary  p-3 rounded-lg gap-3">

                <Link className="font-semibold text-xl text-white" href={"/menu-items/new"}
                
                > <p>Create New Menu Item</p>
                    
                </Link>

                <Right></Right>

            </div>

            <div>

                <h2 className="text-xl font-semibold pt-3 pl-3">Edit Menu Item:</h2>

                {/*De el primer estado de los items del menu si es mayor a 0, (pasa) damos que ese estado sea mapeado */}
                
                {menuItems.length > 0 && menuItems.map((item, index) => (

                    // un link donde la ref es ir al menu-items del edit del id de el item del menu mencionado
                    <Link href={"/menu-items/edit/"+item._id}>

                        <div className="bg-white flex justify-center rounded-xl p-4 gap-4 cursor-pointer uppercase m-3">

                            <Image src={item.images} alt="Photo" width={100} height={50}></Image>

                            <div className="text-xl pt-4 gap-4 font-semibold">
                            
                                <p className={cssText}> NAME: <span className={cssTextItem}>{item.name}</span></p>   

                                <p className={cssText}>Description: <span className={cssTextItem}>{item.description}</span></p>

                                <p className={cssText}>Base Price: <span className={cssTextItem}>${item.basePrice}</span></p>

                            </div>

                        </div>
                    
                    </Link>

                ))}

            </div>

        </section>
        
    )

}