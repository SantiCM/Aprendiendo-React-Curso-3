import { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null)

const getDefault = () => {
        
    let cart = {}

    for(let index = 0; index < all_product.length; index++) {
        
        cart[index] = 0
    
    }

    return cart

}

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefault)

    const add = (itemId) => {
        
        setCartItems((prev) => ({...prev,[itemId]: prev[itemId] +1 }))
    
    }

    const totalAmount = () => {
        
        let total = 0

        for(const item in cartItems) {
            
            if(cartItems[item] > 0) {
            
                let info = all_product.find((product) => product.id === Number(item))

                total += info.new_price * cartItems[item]
            
            }

            return total
        
        }
    
    }

    const remove = (itemId) => {
        
        setCartItems((prev) => ({...prev,[itemId]: prev[itemId] - 1 }))
    
    }

    const contextValue = {all_product, cartItems, add, remove, totalAmount}

    return (
        
        <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
        
        
    )

}

export default ShopContextProvider