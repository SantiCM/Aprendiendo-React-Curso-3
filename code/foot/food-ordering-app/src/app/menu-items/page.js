"use client"
import Link from "next/link";
import UserProfile from "../../components/UserProfile";
import TabsProfile from "../../components/layout/TabsProfile";
import Right from "../../components/icons/Right";
import { useEffect, useState } from "react";
//import Image from "next/image";

export default function Menu() {

    const [menuItems, setMenuItems] = useState([])

    const { data: profileData , loanding: profileLoanding } = UserProfile()

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
                
                >
                    
                    <p>Create New Menu Item</p>
                    
                </Link>

                <Right></Right>

            </div>

            <div className="max-h-full">

                <h2 className="text-xl font-semibold pt-3">Edit Menu Item:</h2>

                {menuItems.length > 0 && menuItems.map((item) => (

                    <>                    
                        <div className="bg-white rounded-lg p-2 flex justify-center mx-auto cursor-pointer uppercase m-2">

                            <Link href={"/menu-items/edit/"+item._id} 
                            
                                className="border-none text-lg font-semibold text-primary"
                            
                            >

                                {/*<Image src={item.image} alt="Photo Menu Item"></Image>*/}
                                
                                {item.name}
                                
                            </Link>

                        </div>
                    
                    </>

                ))}

            </div>

        </section>
        
    )

}