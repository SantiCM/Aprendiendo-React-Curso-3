"use client"
import Link from "next/link";
import UserProfile from "../../components/UserProfile";
import TabsProfile from "../../components/layout/TabsProfile";
import Right from "../../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";
//import Image from "next/image";

export default function Menu() {

    const [menuItems, setMenuItems] = useState([])

    const { data: profileData , loanding: profileLoanding } = UserProfile()

    const cssText = "text-primary"

    const cssTextItem = "text-black"

    useEffect(() => {
     
        fetch("/api/menu-items").then(response => {
        
            response.json().then(menuItems => {
            
                setMenuItems(menuItems)
            
            })
        
        })

    }, [])
    

    if(profileLoanding) {
        
        return "Loanding User Info..."
    
    }

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

                {menuItems.length > 0 && menuItems.map((item) => (

                    <div className="max-w-1xl"> 

                        <div className="bg-white rounded-xl flex p-2 gap-3 cursor-pointer uppercase m-3">

                            <Image src={item.images} width={120} height={100}></Image>

                            <div className="flex flex-col text-xl pt-4 gap-4 font-semibold">

                                <Link href={"/menu-items/edit/"+item._id} 
                            
                                    className="text-primary"
                         
                                >  <p>NAME: <span className={cssTextItem}>{item.name}</span></p>

                                </Link>    

                                <p className={cssText}>Description: <span className={cssTextItem}>{item.description}</span></p>

                                <p className={cssText}>Base Price: <span className={cssTextItem}>${item.basePrice}</span></p>

                            </div>

                        </div>
                    
                    </div>

                ))}

            </div>

        </section>
        
    )

}