"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"

export default function ProfilePage(){

    const session = useSession()

    const {status} = session

    if(status === "loading") {
        
        return "Loanding.."
    
    }

    if(status === "unauthenticated") {
        
       return redirect("/login")
    
    }

    const userImage = session.data?.user?.image

    return (
        
        <section className="mt-8">

            <h1 className="text-center text-primary text-4xl pt-4">Profile</h1>

            <form className="max-w-xs mx-auto border mt-4">

                <div>

                    <Image src={userImage} width={64} height={64}></Image>

                </div>
                
            </form>            

        </section>
    
    )

}