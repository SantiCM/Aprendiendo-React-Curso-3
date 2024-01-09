"use client"
import { useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import Menu from "../../components/layout/MenuItem";


export default function MenuPage() {

    const [categories, setCategories] = useState([])

    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
    
        fetch("/api/categories").then(response => {
    
            response.json().then(categories => {
        
                setCategories(categories)
        
            })
    
        })

        fetch("/api/menu-items").then(response => {
    
            response.json().then(items => {
        
                setMenuItems(items)
        
            })
    
        })

    }, [])
   
    

    return (
        
        <section>
            
            {categories.length > 0  && categories.map((text, index) =>  (

                <div className="text-center">
                 
                    <SectionHeaders mainHeader={text.name}></SectionHeaders>
                    
                    <div key={index} >

                        {menuItems.filter(item => item.category === text._id).map((text) => (
                        
                            <Menu {...text}></Menu>
                    
                        ))}

                    </div>

                </div>
  
            ))}

        </section>
        
    )

}