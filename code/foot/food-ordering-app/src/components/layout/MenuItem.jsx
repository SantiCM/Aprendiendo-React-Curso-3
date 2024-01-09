import { useContext } from "react"
import { CartContext } from "../reutizable/AppContext"

export default function Menu( menuItem ) {

    const {images, name, description, basePrice} = menuItem

    const {addToCard} = useContext(CartContext)

    return (
        
        <div 
            
            className="bg-tercer mt-3 p-4 group rounded-md text-center hover:shadow-md hover:bg-hoverMenu transition-all"
            
        >
            
            <div className="text-center">

                <img src={images} className="max-h-auto h-36 block mx-auto" alt={"food in menu"} />

            </div>

            <h4 className="font-semibold my-4 text-xl">{name}</h4>


            <p className="text-gray-600 text-sm">{description}</p>

            <button onClick={() => addToCard(menuItem)} className=" mt-4 bg-primary text-white px-5 py-3 rounded-md border-none">$ {basePrice}</button>

        </div>
        
    )

}