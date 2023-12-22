"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header () {

    const session = useSession()

    const status = session?.status

    const dataUser = session.data?.user

    let userName = dataUser?.name

    if(userName && userName.includes("")){
        
        userName = userName.split(" ")[0]
    
    }
  
    return (
        <header className="flex items-center justify-between">

            <nav className="flex items-center gap-8 text-gray-900 font-bold text-xl">

                <Link href={"/"} className="text-primary font-semibold text-2xl" >PIZZA COMPANY</Link>

                <Link href={"/"}>Home</Link>

                <Link href="">Menu</Link>

                <Link href="">About</Link>

                <Link href="">Contact</Link>

            </nav>

            <nav className="flex items-center gap-4 text-gray-900">

                {status === "authenticated" && (
                    
                    <>

                        <Link className="text-md m-3 bg-slate-300 text-black py-2 p-3 rounded-lg" href={"/profile"}>Hello, {userName}</Link>

                        <button onClick={() => signOut()} className="bg-primary rounded-lg text-white px-8 py-2 font-medium text-lg">Logout</button>
                    
                    </>

                    
                )}

                {status === "unauthenticated" && (

                    <>

                        <Link href={"/register"} className="bg-primary rounded-lg text-white px-8 py-2 font-medium text-lg">Register</Link>

                        <Link href={"/login"} className="font-bold text-xl">Login</Link>    
                    
                    </>
                    
                )}

            </nav>

        </header>
    
    )

}