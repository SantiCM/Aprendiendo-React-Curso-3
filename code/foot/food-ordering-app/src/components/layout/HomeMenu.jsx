//import Image from "next/image";
//import ensaldLeft from "../../../public/sallad2.png"
//import ensaldRight from "../../../public/sallad1.png"
"use client"
import { useEffect, useState } from "react";
import Menu from "./MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu(){

    const [menu, setMenu] = useState([])

    useEffect(() => {

        fetch("/api/menu-items").then(response => {
            
            response.json().then(items => {
                
                const itemsMenu = items.slice(-3)

                setMenu(itemsMenu)
            
            })
        
        })
      
    }, [])
    

    return (
        
        <section>

            <div className="text-center mb-4">

                <SectionHeaders 
                
                    subHeader={"Check Out"}

                    mainHeader={"Menu"}
                
                />

            </div>

            <div className="grid grid-cols-3 gap-6 max-w-max"> {/* sm:grid-cols-1 md:grid-cols-2*/}

                {menu?.length > 0 && menu.map((item) => (
                    
                    <Menu {...item}></Menu>
                    
                ))}
                
            </div>

        </section>
        
    )

}

/*
    <div className="absolute left-0 -top-[70px] text-left -z-10">

        <Image src={ensaldRight} width={109} height={189}  alt="Ensalada"></Image>
                    
    </div>

    <div className="absolute -top-[200px] right-0 -z-10">

       <Image src={ensaldLeft} width={107} height={100} alt="Ensalada"></Image>
                    
    </div>
 */