import Link from "next/link";
import { useState } from "react";
import Right from "../icons/Right"
import EditableImage from "./EditableImage"
import PropsMenu from "./PropsMenu"

export default function InputForm( { onSubmit, menuItem } ) {

    // damos el estado de las imagenes 
    const [images, setImages] = useState(menuItem?.images || "")

    const [name, setName] = useState(menuItem?.name || "")

    const [description, setDescription] = useState(menuItem?.description || "")

    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "")

    const [sizes, setSizes] = useState(menuItem?.sizes || [])

    const [extraIngredients, setExtraIngredients] = useState(menuItem?.extraIngredients || [])

    const cssLabel = "text-gray-900 text-md uppercase"

    return (
    
        <form className="mt-8 max-w-xl mx-auto" onSubmit={ev => onSubmit(ev, {images, name, description, basePrice, sizes, extraIngredients})}>
            
            <div className="flex gap-2 items-end">
                
                <div className="grow">
                    
                    <label className={cssLabel}>Name</label>

                    <input
                        
                        type="text" value={name} onChange={(ev) => setName(ev.target.value)}
                    
                    ></input>

                    <label className={cssLabel}>Description</label>

                    <input
                        
                        type="text"  value={description} onChange={(ev) => setDescription(ev.target.value)}
                    
                    ></input>

                    <label className={cssLabel}>Base Price</label>

                    <input
                    
                        type="text" value={basePrice} onChange={(ev) => setBasePrice(ev.target.value)}
                
                    ></input>

                    <label className={cssLabel}>Image</label>

                    {/* Le damos el coomponente, el link osea lo que recibe la respuesta es el primer estado de la data
                    y el segundo estado, que es el que recibe la respuesta, es el segundo estado de aca que da el valor
                    */}
                    
                    <EditableImage link={images} setLink={setImages}></EditableImage>

                    <PropsMenu 
                
                        name="Sizes" label="Add Sizes (Like Medium Or Large)" 
                    
                        props={sizes} setProps={setSizes}
                    
                    ></PropsMenu>

                    <PropsMenu 
        
                        props={extraIngredients} setProps={setExtraIngredients}
                    
                        label="Extra Ingredients" name="Ingredients"
                
                    ></PropsMenu>

                    <button
                    
                        className="bg-primary text-white border-none mb-8" type="submit"
                    > Save
                
                    </button>

                    <div className="flex justify-center bg-tercer max-w-sm mx-auto p-3 rounded-lg gap-3 mb-4">
                    
                        <Link
                             href={"/menu-items"} className="font-semibold text-xl text-black"
                    
                        > <p>Show All Menu Items</p>
                    
                        </Link>

                        <Right></Right>
                
                    </div>
            
                </div>
        
            </div>
    
        </form>
  
    );

}