"use client"
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({})

export function AppProvider({children}){

    // estado de los productos como array vacio
    const [cartProducts, setCartProducts] = useState([])

    // del window si es diferente damos indefinido si pasa damos que se guarde en localStorage
    // si no nuloo
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    // efecto
    useEffect(() => {

        // si lo de arriba pasa, damos el cart al localStorage
        if (ls && ls.getItem('cart')) {
            
            // el segundo estado es json
            // parse analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis
            // damos el ls, le innsertamos el cart
            setCartProducts( JSON.parse( ls.getItem('cart') ) );
        
        }
    
    }, []);

    // eliminar
    function clearCart() {
        
        // segundo estado nada
        setCartProducts([]);
        
        // guardar en local, nada
        saveCartProductsToLocalStorage([]);
    }

    // remover, damos el index
    function removeCartProduct(indexToRemove) {

        // 2 estado, damos argumento
        setCartProducts(prevCartProducts => {
            
            // nuevo, sera el argumento, lo filtramos, osea encontrar el primero que pase
            // y si el index es diferente al argumento de arriba
            const newCartProducts = prevCartProducts.filter((v,index) => index !== indexToRemove);
            
            // damos guardar la variable de arriba
            saveCartProductsToLocalStorage(newCartProducts);
            
            // retorno
            return newCartProducts;
    
        });

    }

    // guardar, damos argumento
    function saveCartProductsToLocalStorage(cartProducts) {
        
        // si el ls pasa
        if (ls) {
            
            // damos el cart, y damos el json, lo volvemos string, y damos el ar de arriba
            ls.setItem('cart', JSON.stringify(cartProducts));
    
        }
    }

    function addToCard(product, size=null, extras=[]) {
    
        setCartProducts(prev => {

            const productInfo = { ...product, size, extras}
        
            const newProduct = [...prev, productInfo ]

            return newProduct
        
        })
    
    }

    return (
        
        <SessionProvider>

            <CartContext.Provider value={{cartProducts, setCartProducts, addToCard, clearCart ,removeCartProduct}}>

                {children}

            </CartContext.Provider>

        </SessionProvider>    
    
    )

}