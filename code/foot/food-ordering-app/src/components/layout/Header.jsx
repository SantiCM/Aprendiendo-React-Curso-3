"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

// damos el header 
export default function Header () {

    // recojemos la sesion del auth 
    const session = useSession()

    // el status sera la sesion si existe del status
    const status = session?.status

    // la data del usuario es la session de la data si existe del usuario
    const dataUser = session.data?.user

    // recojemos la data del username si existe del name
    let userName = dataUser?.name

    // si el username pasa damos que si el name incluye 
    if(userName && userName.includes("")){

        // damos el split con un espacio y 0 de arreglo 
        userName = userName.split(" ")[0]
    
    }
  
    return (
        
        <header className="flex items-center justify-between">

            <nav 
                
                className="flex items-center gap-8 text-secondary font-bold text-xl " // sm:flex-col md:gap-10
            >

                <Link href={"/"} className="text-primary font-semibold text-2xl">PIZZA COMPANY</Link>

                <Link href={"/"}>Home</Link>

                <Link href="">Menu</Link>

                <Link href="">About</Link>

                <Link href="">Contact</Link>

            </nav>

            <nav className="flex items-center gap-4 text-secondary"> {/*sm:flex-col*/}

                {/* Si el status es autenticado damos el  */}
                {status === "authenticated" && (
                    
                    <>

                        {/* Damos el link de el aparatado del perfil a la direccion del profile */}
                        <Link className="text-md m-3 bg-slate-300 text-black py-3 p-4 rounded-lg" href={"/profile"}>Hello, {userName}</Link>

                        {/* Al darle click al boton hacemos el logout */}
                        <button onClick={() => signOut()} className="bg-primary rounded-lg text-white px-8 py-2 font-medium text-lg">Logout</button>
                    
                    </>

                    
                )}

                {/* Si el status es no-auntenticado */}
                {status === "unauthenticated" && (

                    <>

                        {/* Damos el link de registro */}
                        <Link href={"/register"} className="bg-primary rounded-lg text-white px-8 py-2 font-medium text-lg md:ml-4">Register</Link>

                        {/* Damos el link de login */}
                        <Link href={"/login"} className="font-bold text-xl">Login</Link>    
                    
                    </>
                    
                )}

            </nav>

        </header>
    
    )

}