"use client"
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link';
import { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ErrorIcon from '@mui/icons-material/Error';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [creatingUser, setCreatingUser] = useState(false)

    const [userCreated, setUserCreated] = useState(false)

    const [error, setError] = useState(false)

    async function handleForm(ev) {

        ev.preventDefault()

        setCreatingUser(true)

        setError(false)

        setUserCreated(false)

        const response = await fetch("/api/register",  { 
                
            method: "POST", body: JSON.stringify({email, password}),

            headers: { "Content-Type": "application/json" }
        
        })

        if(response.ok) {
            
            setUserCreated(true)
        
        } else {
            
            setError(true)
        
        }

        setCreatingUser(false)
  
    }

    return (
        
        <section className="mt-9 max-w-sreen">
            
            <h1 className="text-center text-primary text-4xl pt-4">Register</h1>

            {userCreated && (
                
                <div className='mt-4 text-center text-xl'>

                    User created. Now you can <Link className='underline' href={"/login"}>Login <ArrowRightAltIcon></ArrowRightAltIcon></Link>

                </div>
                
            )}

            {error && (
                
                <div className='mt-4 text-center text-xl'>

                   An Error has ocurred. Please try again later <ErrorIcon></ErrorIcon>

                </div>
                
            )}

            <form className="block max-w-screen-sm mx-auto" onSubmit={handleForm}>

                <input 
                    
                    type="text" 
                    placeholder="Please enter you email" 
                    value={email} 
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)}
                    
                />

                <input 
                
                    type="password" 
                    placeholder="Please enter you password" 
                    value={password} 
                    disabled={creatingUser}
                    onChange={ev => setPassword(ev.target.value)}
                    
                />

                <button type="submit" className="submit" disabled={creatingUser}>Register</button>

                <div className="my-4 text-center text-gray-500"><p>Or Login With Provider</p></div>

                <button type="button" onClick={() => signIn("google", {redirect: "/"})} className='flex gap-2 text-white bg-red-900'>

                    <GoogleIcon></GoogleIcon>
                    
                    Login with Google
                    
                </button>

                <div className='text-center my-4 text-xl text-gray-500'>

                    Existing account? <Link className='underline' href={"/login"}>Login Here</Link>

                </div>

            </form>

        </section>
        
    )

}