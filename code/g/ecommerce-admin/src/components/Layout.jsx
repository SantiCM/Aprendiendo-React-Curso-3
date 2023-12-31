import { signIn, useSession } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Layout({children}) {

  const { data: session } = useSession()

  //w-screen h-screen flex items-center

  if(!session) {
    
    return (

      <div className=" bg-blue-900 w-screen h-screen flex items-center">

        <div className="text-center w-full">

          <button onClick={() => signIn("google")} className="bg-white rounded-lg px-4 p-2">Login With Google</button>

        </div>

      </div>
      
      
    )

  }

  return (

    <div className="bg-blue-900 min-h-screen flex flex-2">

      <div className="bg-gray-500 "> 

        <Nav></Nav>

      </div>

      <div className="bg-white flex-grow mt-12 rounded-md p-6">{children}</div>

    </div>

  )

}