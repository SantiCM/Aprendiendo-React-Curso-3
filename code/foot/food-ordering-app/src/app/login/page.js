"use client"
import { useState } from "react"
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react"

export default function LoginPage(){

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [loginInProgress, setLoginInProgress] = useState(false)

    async function handleForm(ev){
        
        ev.preventDefault()

        setLoginInProgress(true)

       await signIn("credentials", {email,password})

        setLoginInProgress(true)

    }

    return (
        
        <section className="mt-8">
            
            <h1 className="text-center text-primary text-4xl pt-4">Login</h1>

            <form className="block max-w-screen-sm mx-auto" onSubmit={handleForm}>

                <input 
                    
                    type="text" 
                    placeholder="Please enter you email" 
                    value={email} 
                    name="email"
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)}
                    
                />

                <input 
                
                    type="password" 
                    placeholder="Please enter you password" 
                    name="password"
                    value={password} 
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)}
                    
                />

                <button disabled={loginInProgress} className="submit">Login</button>

                <div className="my-4 text-center text-gray-500 "><p>Or Login With Provider</p></div>

                <button type="button" onClick={() => signIn("google", {redirect: "/"})} className='flex gap-2 text-white bg-red-900'>

                    <GoogleIcon></GoogleIcon>
                    
                    Login with Google
                    
                </button>

            </form>

        </section>
        
    )

}